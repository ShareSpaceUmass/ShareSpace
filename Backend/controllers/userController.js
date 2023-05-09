const jwt = require("jsonwebtoken");
const { Users, Messages, Preferences } = require("../models");
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

Users.hasOne(Preferences);
Preferences.belongsTo(Users);

Users.hasMany(Messages);
Messages.belongsTo(Users);

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
  }


// @desc   Delete an existing user
// @route  DELETE /users/deleteUser
// @access Private
const deleteUser = async (req, res) => {
  try {
    const deleted = await Users.destroy({ where: { email: req.body.email } });
    console.log(`Deleted user: ${deleted}`);
    res.status(200).json({ message: "User deleted succesfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};

// @desc   Delete all users
// @route  DELETE /users/deleteAllUsers
// @access Private
const deleteAllUsers = async (req, res) => {
  try {
    await Users.destroy({ where: {} });
    console.log(`Deleted all users`);
    res.status(200).json({ message: "All users deleted" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting all users." });
  }
};

// @desc   Get user
// @route  GET /getUser
// @access Private
const getUser = async (req, res) => {
  try {
    //TODO:
    //Figure out how to join these 2 tables
    console.log("Checking user")
    const user = await Users.findOne({
      where: {
        email: req.body.email
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
// @route  POST /updateUser
// @access Private
const updateUserData = async (req, res) => {
  let changedPfp = req.body.changedPfp;

  const updatedUser = {
    fName: req.body.fName,
    lName: req.body.lName,
    gender: req.body.gender,
    age: req.body.age,
    bio: req.body.bio,
    year: req.body.year,
    major: req.body.major,
    cleanliness: req.body.cleanliness,
    guests: req.body.guests,
    timeInRoom: req.body.timeInRoom,
    noise: req.body.noise,
    pets: req.body.pets,
    earlyBird: req.body.earlyBird
  };

  const updatedPreference = {
    cleanliness: req.body.prefCleanliness,
    guests: req.body.prefGuests,
    timeInRoom: req.body.prefTimeInRoom,
    noise: req.body.prefNoise,
    pets: req.body.prefPets,
    earlyBird: req.body.prefEarlyBird,
    drugs: req.body.prefDrugs
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
  }

  try {
    await Users.update(updatedUser, {
      where: { email: req.body.email },
    });

    await Preferences.update(updatedPreference, {
      where: { email: req.body.email },
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


// @desc   Adds a user's preferences
// @route  POST /addUserPreferences
// @access Public
const addUserPreferences = async (req, res) => {
  try {
    const preference = {
      email: req.body.email,
      cleanliness: req.body.cleanliness,
      guests: req.body.cleanliness,
      timeInRoom: req.body.timeInRoom,
      noise: req.body.noise,
      pets: req.body.pets,
      earlyBird: req.body.earlyBird,
      drugs: req.body.drugs
    };

    await Preferences.create(preference);
    res.status(200).json({ message: "User preferences added succesfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding user preferences." });
  }
};

// @desc   Checks if a user has completed their preferences
// @route  POST /userCompletedPreferences
// @access Private
const userCompletedPreferences = async (req, res) => {
  try {
    console.log("Checking user")
    const user = await Users.findOne({
      where: {
        email: req.body.email
      },
    });
    if (!user) {
      console.log("❌ user was not found in db");
      res.status(500).json({ error: "user was not found in database" });
    }
    let prefs = ["email", "cleanliness", "guests", "timeInRoom", "noise", "pets", "earlyBird", "drugs"];
    let hasProps = true;
    prefs.forEach(preference => {
      hasProps = hasProps && user.hasOwnProperty("prop") && user[preference] != null;
    });

    console.log("preferences checked, completed: ", hasProps);
    res.send(hasProps);
    console.log("✅ user completion status sent to frontend");

  } catch (err) {
    console.log("❌ error checking user:", err);
    res
      .status(500)
      .json({ message: "An error occurred while checking this user." });
  }
}

// @desc   Get all of a user's messages, sorted by most recent
// @route  GET /getAllMessages
// @access Private
const getAllMessages = async (req, res) => {
  try {
    const unreadMessages = await Messages.findAll({
      where: {
        senderEmail: req.body.senderEmail,
        read: false
      },
      order: [
        ['updatedAt', 'DESC']
      ]
    });
    res.send(messages);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching all unread messages." });
  }
};

// @desc   Adds a message to the table
// @route  POST /addMessage
// @access Public
const addMessage = async (req, res) => {
  try {
    const message = {
      senderEmail: req.body.senderEmail,
      receiverEmail: req.body.receiverEmail,
      content: req.body.conten,
      read: false
    };

    await Messages.create(message);
    res.status(200).json({ message: "User preferences added succesfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding user preferences." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserData,
  deleteUser,
  deleteAllUsers,
  getUser,
  getAllUsers,
  addUserPreferences,
  userCompletedPreferences,
  getAllMessages,
  addMessage
};
