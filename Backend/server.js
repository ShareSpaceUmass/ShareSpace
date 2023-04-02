const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken")
const cors = require("cors");
const dotenv = require('dotenv').config();
const app = express();
const port = '3000';

app.use(express.json());
app.use(cors());


// Connect
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'april2002',
  database: 'giraffe'
});

db.connect((err) => {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

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

// Create table
app.post('/createUserTable', (req, res) => {
  let sql = 'CREATE TABLE users(id INT Primary KEY AUTO_INCREMENT, email VARCHAR(255), password CHAR(30), username CHAR(20), bio VARCHAR(255))';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("users table created!");
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
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  }
  catch(e){
    res.sendStatus(401);
  }
  
});


module.exports = db; 