const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken")
const cors = require("cors");
const { getUser } = require("./controllers/userController");
const dotenv = require('dotenv').config();
const app = express();
const port = '3000';
const db = require('./models');

app.use(express.json());
app.use(cors());


// Connect
// const db = mysql.createConnection({
//   host: 'sharespace-db.caerbupd5wj1.us-east-2.rds.amazonaws.com',
//   user: 'admin',
//   password: '3c84xGsI*288',
//   database: 'userDatabase'
//   // database: 'giraffe'
// });


// db.connect((err) => {
//   if (err) {
//     return console.error('error: ' + err.message);
//   }
//   console.log('Connected to the MySQL server.');
// });
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

db.sequelize.sync({alter: true}).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})

// All user routes contained in /routes/userRoutes
app.use('/users', require('./routes/userRoutes'))

// Create database
app.post("/createDatabase", (req, res) => {
  let sql = 'CREATE DATABASE userDatabase';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("Database created!");
  })
});

// Create users table
app.post('/createUserTable', (req, res) => {
  let sql = 'CREATE TABLE users(id INT Primary KEY AUTO_INCREMENT, email VARCHAR(255), \
  fName CHAR(255), lName CHAR(255), gender CHAR(20), age int, bio VARCHAR(255))';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("users table created!");
  });
});

// Delete users table
app.post('/deleteUserTable', (req, res) => {
  let sql = 'DROP TABLE users';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("users table deleted!");
  });
});

// Create messages table
app.post('/createMessageTable', (req, res) => {
  let sql = 'CREATE TABLE messages(id INT Primary KEY AUTO_INCREMENT, sender CHAR(20), receiver CHAR(20), content VARCHAR(255))';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("messages table created!");
  });
});

// Delete messages table
app.post('/deleteMessageTable', (req, res) => {
  let sql = 'DROP TABLE messages';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("messages table deleted!");
  });
});

app.get('/', (req,res) => {
  res.send("Home")
})

// Verifies token given in URL
app.get("/verify", (req, res) => {
  const token = req.query.token;
  if(token == null) res.sendStatus(401);
  try{
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    let user;
    getUser(decodedToken, user);
    res.send(`Authed as ${user}`)
  }
  catch(e){
    res.sendStatus(401);
  }
  
});


module.exports = db; 