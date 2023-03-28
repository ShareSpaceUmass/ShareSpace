const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = '3000';

//Connect
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'userDatabase'
});

db.connect((err) => {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});


//Create database
app.get("/createDatabase", (req, res) => {
  let sql = 'CREATE DATABASE userDatabase';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("Database created!");
  })
});

//Create table
app.get('/createUserTable', (req, res) => {
  let sql = 'CREATE TABLE users(id INT Primary KEY AUTO_INCREMENT, email VARCHAR(255), password CHAR(30), username CHAR(20), bio VARCHAR(255))';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("users table created!");
  });
});

//Insert user into users table
app.get('/setUser', (req, res) => {
  let user = {email: "testUser@gmail.com", password: "123", username: "testUser", bio: "I love nothing"};
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, user, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("user added!");
  });
});

//Get user from users table
app.get('/getUser/:userId', (req, res) => {
  let sql = 'SELECT * FROM users WHERE id ='+ req.params.userId;
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("user fetched!");
  });
});

//Upadate user from users table
app.get('/updateUser/:userId/:field/:value', (req, res) => {
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
});

//Get all users from user table
app.get('/getAllUsers', (req, res) => {
  let sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("users fetched!");
  });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});