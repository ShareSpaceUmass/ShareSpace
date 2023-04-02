const jwt = require("jsonwebtoken")
const db = require('../server')
const { sendMagicLinkEmail } = require('./middleware/sendLink')

// @desc   Register a new user
// @route  POST /users
// @access Public
const registerUser = (req,res) => {
  const username = req.body.username;
  const email = req.body.email;

  db.query(
    "INSERT INTO users (email, username) VALUES (?, ?)", [email, username], 
    (err, result) => {
      if(err) return console.error('registration error: ' + err.message);
      console.log(result);
      res.send("user added!");
    }
  );
}

// @desc   Authenticate a user
// @route  POST /users/login
// @access Public
const loginUser = (req, res) => {
    const user = USERS.find(u => u.email === req.body.email)

    if (user != null) {
      try {
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
          expiresIn: "1h",
        })
        await sendMagicLinkEmail({email: user.email, token})
      } catch (e) {
        return res.json("Error logging in. Please try again") //not entirely sure how to connect to frontend, but I think we use this to send a 
                                                              //json with this message up the chain
      }
    }
  
    res.json("Email not registered")
}

// @desc   Get user
// @route  GET /getUser/:userId
// @access Private
const getUser = (req,res) => {
    let sql = 'SELECT * FROM users WHERE id ='+ req.params.userId;
    db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("user fetched!");
  });
}

// @desc   Get all users
// @route  GET /getAllUsers
// @access Private
const getAllUsers = (req, res) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
      if(err) return console.error('error: ' + err.message);
      console.log(result);
      res.send("users fetched!");
    });
};

// @desc   Update user data
// @route  GET /updateUser/:userId/:field/:value
// @access Private
const updateUserData = (req, res) => {
    let value = req.params.value;
    let sql = 'UPDATE users SET ' + req.params.field + ' = ';
    if(typeof(value) == 'string')
      sql += '\'' + req.params.value + '\'' + ' WHERE id = ' + req.params.userId;
    else
      sql += req.params.value + ' WHERE id = '+ req.params.userId;
  
    db.query(sql, (err, result) => {
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
    getAllUsers
}