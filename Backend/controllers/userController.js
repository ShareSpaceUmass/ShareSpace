const jwt = require("jsonwebtoken")
const { Users } = require('../models')
const { Messages } = require('../models')
const dotenv = require('dotenv').config();
const { sendMagicLinkEmail } = require('../middleware/sendLink')


// @desc   Register a new user
// @route  POST /users
// @access Public
const registerUser = async (req,res) => {
  try {
      const user = {
        email: req.body.email,
        firstName: req.body.fName,
        lastName: req.body.lName,
        gender: req.body.gender
      };
    
      await Users.create(user);
      res.status(200).json({message:"User registered succesfully"});
      
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while registering the user."});
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
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while fetching all users."});
  }
};

// @desc   Update user data
// @route  GET /updateUser/:userId/:field/:value
// @access Private
const updateUserData = async (req, res) => {
  let value = req.params.value;
  let userId = req.params.userId;
  let field = req.params.field;
  // try{
  //   await Users.update(
  //     {
  //       field: value
  //     },
  //     {
  //       id: userId
  //     }
  //   );
  //   console.log("Field successfully updated.");
  // }
  // catch(err){
  //   console.error(err);
  //   res.status(500).json({message: "An error occurred while updating this field."});
  // }

  db.query('UPDATE users SET ? = ? WHERE id = ?', [field, value, userId], (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("user updated!");
  });
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUserData,
    getAllUsers,
}