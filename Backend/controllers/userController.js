const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { Messages } = require("../models");
const dotenv = require("dotenv").config();
const { sendMagicLinkEmail } = require("../middleware/sendLink");
const crypto = require("crypto");
const sharp = require("sharp");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3ServiceException,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const e = require("express");

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const cache = require("../utils/cache");

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// @desc   Register a new user
// @route  POST /users
// @access Public
const registerUser = async (req, res) => {
  try {
    const checkExistingEmail = await Users.findOne({
      where: { email: req.body.email },
    });
    if (checkExistingEmail)
      res.status(500).json({ message: "Email is already registered." });
    else {
      const user = {
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        gender: req.body.gender,
      };

      await Users.create(user);
      res.status(200).json({ message: "User registered succesfully" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
};

// @desc   Authenticate a user
// @route  POST /users/login
// @access Public
const loginUser = async (req, res) => {
  console.log("logging in user...");
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user != null) {
    console.log("user found:", user.email);
    try {
      const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      await sendMagicLinkEmail(req.body.email, token);
      console.log("✅ Verification email sent to", req.body.email);

      // wait for link to be pressed in email
      console.log(`waiting for ${req.body.email} to login via email`);
      let pollingInterval = setInterval(() => {
        const linkClicked = cache.get(token);
        if (linkClicked) {
          console.log("✅ link click has been detected");
          clearInterval(pollingInterval);
          res
            .status(200)
            .json({ token: token, message: "User successfully logged in" });
        }
      }, 1000);
      // want to return a jwt for the user here
    } catch (e) {
      console.log("❌ Error logging in");
      return res
        .status(500)
        .json({ error: "Error logging in. Please try again" }); //not entirely sure how to connect to frontend, but I think we use this to send
      //json with this message up the chain
    }
  } else {
    console.log("❌ user not found in db");
    res
      .status(500)
      .json({ error: "The user provided was not found in the database" });
  }
};

// @desc   Delete an existing user
// @route  POST /users/deleteUser/:userId
// @access Public
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deleted = await Users.destroy({ where: { id: userId } });
    console.log(`Deleted user: ${deleted}`);
    res.status(200).json({ message: "User deleted succesfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};

// @desc   Get user
// @route  GET /getUser/:userId
// @access Private
const getUser = async (req, res) => {
  console.log(`getting user: ${req.body.email} ...`);
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      console.log("❌ user was not found in db");
      res.status(500).json({ error: "user was not found in database" });
    }
    console.log("user found", user.email);
    res.send(user);
    console.log("✅ user sent to frontend");
  } catch (err) {
    console.log("❌ error getting user:", err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching this user." });
  }
};

// @desc   Get all users
// @route  GET /getAllUsers
// @access Private
const getAllUsers = async (req, res) => {
  console.log("getting all users...");
  try {
    const users = await Users.findAll();
    res.send(users);
    console.log("✅ all users sent to frontend");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching all users." });
  }
};

// @desc   Update user data
// @route  POST /updateUser/:userId
// @access Private
const updateUserData = async (req, res) => {
  let userId = req.params.userId;
  let changedPfp = req.body.changedPfp;

  const updatedUser = {
    email: req.body.email,
    fName: req.body.fName,
    lName: req.body.lName,
    gender: req.body.gender,
    age: req.body.age,
    bio: req.body.bio,
  };

  if (changedPfp) {
    const imageName = randomImageName();
    //resize image
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();
    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: req.file.mimetype,
    };

    const postCommand = new PutObjectCommand(params);
    await s3.send(postCommand);
    updatedUser.profilePic = imageName;

    const getObjectParams = {
      Bucket: bucketName,
      Key: imageName,
    };
    const getCommand = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, getCommand);
    updatedUser.imageUrl = url;
  }

  try {
    await Users.update(updatedUser, {
      where: { id: userId },
    });
    res.send("Field updated");
    console.log("Field successfully updated.");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while updating this field." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  getUser,
  updateUserData,
  getAllUsers,
};
