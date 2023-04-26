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
app.use(express.urlencoded({extended: false}));


// Connect
// const db = mysql.createConnection({
//   host: 'sharespace-db.caerbupd5wj1.us-east-2.rds.amazonaws.com',
//   user: 'admin',
//   password: '',
//   database: 'userDatabase'
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

// Create database
// app.post("/createDatabase", (req, res) => {
//   let sql = 'CREATE DATABASE userDatabase';
//   db.query(sql, (err, result) => {
//     if(err) return console.error('error: ' + err.message);
//     console.log(result);
//     res.send("Database created!");
//   })
// });

db.sequelize.sync({alter: true}).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})

// All user routes contained in /routes/userRoutes
app.use('/users', require('./routes/userRoutes'))

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