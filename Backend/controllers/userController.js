const jwt = require("jsonwebtoken");
const { Users } = require('../models');
const { Messages } = require('../models');
const dotenv = require('dotenv').config();
const { sendMagicLinkEmail } = require('../middleware/sendLink');
const { emailCheck } = require('../middleware/emailCheck');
const crypto = require('crypto');
const sharp = require('sharp');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials:{
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
})


// @desc   Register a new user
// @route  POST /users
// @access Public
const registerUser = async (req,res) => {
  try {
    const user = {
      email: req.body.email,
      fName: req.body.fName,
      lName: req.body.lName,
      gender: req.body.gender,
    };

    if(!emailCheck(user.email)) {
      throw new Error("Invalid email domain, please use a UMass email")
    }

    await Users.create(user);
    res.status(200).json({message:"User registered succesfully!"});
      
  } catch(err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}

// @desc   Authenticate a user
// @route  POST /users/login
// @access Public
const loginUser = async (req, res) => {
  let user;
  getUser(req.body.email, user)
  if (user != null) {
    try {
      const token = jwt.sign({userId: req.body.email}, process.env.JWT_SECRET, {
        expiresIn: "1h",
      })
      await sendMagicLinkEmail(req.body.email, token)
    } catch (e) {
      console.log(e)
      return res.json("Error logging in. Please try again") //not entirely sure how to connect to frontend, but I think we use this to send 
                                                            //json with this message up the chain
    }
  }

  res.json("Email not registered")
}

// @desc   Delete an existing user
// @route  POST /users/deleteUser/:userId
// @access Public
const deleteUser = async (req,res) => {
  try {
    const userId = req.params.userId;
    const deleted = await Users.destroy({where: {id: userId}});
    console.log(`Deleted user: ${deleted}`);
    res.status(200).json({message:"User deleted succesfully"});
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while deleting the user."});
  }
}

// @desc   Get user
// @route  GET /getUser/:userId
// @access Private
const getUser = async (req,res) => {

  try {
    const user = await Users.findAll({
      where: {
        id: req.params.userId
      }
    });

    //resize image
    const buffer = await sharp(req.file.buffer).resize({height: 1920, width: 1080, fit: "contain"}).toBuffer()
    const getObjectParams = {
      Bucket: bucketName,
      Key: user.imageName
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    user.imageUrl = url;
  
    res.send(user);
    console.log("User fetched: ", JSON.stringify(user, null));
  } 
  catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while fetching this user."});
  }
}

// @desc   Get all users
// @route  GET /getAllUsers
// @access Private
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    console.log("All users:", JSON.stringify(users, null, 2));
    res.send(users)
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while fetching all users."});
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
    bio: req.body.bio
  };

  if(changedPfp){
    const imageName = randomImageName();
    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params);

    await s3.send(command);

    updatedUser.profilePic = imageName;
  }


  try{
    await Users.update(
      updatedUser,
      {
        where: {id: userId}
      }
    );
    res.send("Field updated");
    console.log("Field successfully updated.");
  }
  catch(err){
    console.error(err);
    res.status(500).json({message: "An error occurred while updating this field."});
  }
}

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    getUser,
    updateUserData,
    getAllUsers
}