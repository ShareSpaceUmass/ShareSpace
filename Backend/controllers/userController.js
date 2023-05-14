// import required modules
const jwt = require("jsonwebtoken"); // JSON web tokens
const { Users, Messages } = require("../models"); // database models
const dotenv = require("dotenv").config(); // for loading environment variables
const { sendMagicLinkEmail } = require("../middleware/sendLink"); // for sending email with verification link
const crypto = require("crypto"); // for encyrpting, decripting, hashing, etc
const sharp = require("sharp"); // for image processing
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3ServiceException,
} = require("@aws-sdk/client-s3"); // for interacting with Amazon S3
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner"); // for generating presigned URLs for S3 objects
const e = require("express"); // Web framework for Node.js for handling HTTP requests

// load environment variables
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const cache = require("../utils/cache"); // in-memory cache for storing data temporarily

// create S3 client object
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
<<<<<<< HEAD
    const checkExistingEmail = await Users.findOne({where: {email: req.body.email}});
    if(checkExistingEmail)
      res.status(500).json({message: "Email is already registered."});
    else {
=======
    // check if the email is already registered
    const checkExistingEmail = await Users.findOne({
      where: { email: req.body.email },
    });
    if (checkExistingEmail)
      res.status(500).json({ message: "Email is already registered." });
    else {
      // create a new user object
>>>>>>> e85ca66fabe24a2ad853ed42a1e1d37c7e6dc66e
      const user = {
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        gender: req.body.gender,
      };
      // add the new user to the database
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
<<<<<<< HEAD
  const user = await Users.findOne({where: {email: req.body}});

  if (user != null) {
    try {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      })
      await sendMagicLinkEmail(req.body, token)
    } catch (e) {
      console.log(e)
      return res.status(300).json("Error logging in. Please try again") //not entirely sure how to connect to frontend, but I think we use this to send 
                                                            //json with this message up the chain
    }
  }

  res.status(500).send("Login Failed: email not registered")
}
=======
  console.log("logging in user...");
  try {
      // create a JWT token with the user's email and a secret key
      const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      // send an email with a magic link that contains the token
      await sendMagicLinkEmail(req.body.email, token);
      console.log("✅ Verification email sent to", req.body.email);

      // wait for link to be pressed in email
      console.log(`waiting for ${req.body.email} to login via email`);
      let pollingInterval = setInterval(() => {
        // check if the user has clicked on the link by checking the cache
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

>>>>>>> e85ca66fabe24a2ad853ed42a1e1d37c7e6dc66e

// @desc   Delete an existing user
// @route  DELETE /users/deleteUser
// @access Private
const deleteUser = async (req, res) => {
  try {
    // Delete the user from the database by matching their email address with the email passed in the request body
    const deleted = await Users.destroy({ where: { email: req.body.email } });
    console.log(`Deleted user: ${deleted}`); 
    res.status(200).json({ message: "User deleted succesfully" }); // Send a success message to the client
  } catch (err) {
    // If an error occurred during the deletion process, log the error and send a 500 status code to the client
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
    // Delete all users from the database
    await Users.destroy({ where: {} });
    console.log(`Deleted all users`);
    res.status(200).json({ message: "All users deleted" }); // Send a success message to the client
  } catch (err) {
    // If an error occurred during the deletion process, log the error and send a 500 status code to the client
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
    // Find a user in the database that matches the email address passed in the request body
    console.log("Checking user")
    const user = await Users.findOne({
      where: {
        email: req.body.email
      },
    });
    // If the user was not found in the database, send an error response to the client
    if (!user) {
      console.log("❌ user was not found in db");
      res.status(500).json({ error: "user was not found in database" });
    }
    // If the user was found in the database, send the user data to the client
    console.log("user found", user.email);
    res.send(user);
    console.log("✅ user sent to frontend");

  } catch (err) {
    // If an error occurred during the process, log the error and send a 500 status code to the client
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
    // Find all users in the database
    const users = await Users.findAll();
    // Send the array of users to the client
    res.send(users);
    console.log("✅ all users sent to frontend");
  } catch (err) {
    // If an error occurred during the process, log the error and send a 500 status code to the client
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
  // Create an updated user object with the data from the request body
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
    inRoom: req.body.inRoom,
    noise: req.body.noise,
    pets: req.body.pets,
    earlyBird: req.body.earlyBird,
    closeness: req.body.closeness
  };

  try {
    // Update the user data in the database
    await Users.update(updatedUser, {
      where: { email: req.body.email },
    });
    // Send a success message to the client and log the success
    res.send("Field updated");
    console.log("Field successfully updated.");
  } catch (err) {
    console.error(err);
    // Send an error message to the client
    res
      .status(500)
      .json({ message: "An error occurred while updating this field." });
  }
};

// @desc   Checks if a user has completed their preferences
// @route  POST /userCompletedPreferences
// @access Private
const userCompletedPreferences = async (req, res) => {
  try {
    console.log("Checking user")
    // Find the user by email
    const user = await Users.findOne({
      where: {
        email: req.body.email
      },
    });
    // If user not found, return error response
    if (!user) {
      console.log("❌ user was not found in db");
      res.status(500).json({ error: "user was not found in database" });
    }
    let prefs = ["email", "cleanliness", "guests", "timeInRoom", "noise", "pets", "earlyBird"]; // Define an array of user preferences
    let hasProps = true; // Initialize a variable to track if all preferences are present
    prefs.forEach(preference => {
      // Check if the user object has the preference property and it is not null
      hasProps = hasProps && user.dataValues.hasOwnProperty(preference) && user.dataValues[preference] != null;
    });
    console.log("preferences checked, completed: ", hasProps);
    // Send the completion status to the client
    res.send(hasProps);
    console.log("✅ user completion status sent to frontend");

  } catch (err) {
    console.log("❌ error checking user:", err);
    // Return an error response
    res
      .status(500)
      .json({ message: "An error occurred while checking this user." });
  }
}

// @desc   Get all of a user's messages, sorted by most recent
// @route  GET /getAllMessages
// @access Private
const getAllMessages = async (req, res) => {
  // Find all unread messages sent by the specified senderEmail and sort them by most recent
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
    // Send all unread messages to the client
    res.send(messages);
  } catch (err) {
    // Handle any errors that occur while retrieving messages
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
    // Create a new message with the specified properties
    const message = {
      senderEmail: req.body.senderEmail,
      receiverEmail: req.body.receiverEmail,
      content: req.body.conten,
      read: false
    };
    // Add the new message to the database
    await Messages.create(message);
    res.status(200).json({ message: "User message added succesfully" });
  } catch (err) {
    // Handle any errors that occur while adding the new message to the database
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding user preferences." });
  }
};

// Exporting an object with all the defined functions as properties to make them available to other modules
module.exports = {
  registerUser,
  loginUser,
  updateUserData,
  deleteUser,
  deleteAllUsers,
  getUser,
  getAllUsers,
  userCompletedPreferences,
  getAllMessages,
  addMessage
};
