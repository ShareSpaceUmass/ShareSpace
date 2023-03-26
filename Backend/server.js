const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

//Create database, currently haven't figured out a way to connect to the MySQL server 
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  port: 3306
})

db.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/createdb", (req, res) => {
  let sql = 'CREATE DATABASE userDB';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("Database created.");
  })
});
