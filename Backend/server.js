const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken")
const cors = require("cors");
const { getUser } = require("./controllers/userController");
const dotenv = require('dotenv').config();
const app = express();
const port = '3000';
const db = require('./models');
const User = require('./models');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));



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
app.get("/verify", async (req, res) => {
  const token = req.query.token;
  if(token == null) res.sendStatus(401);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decodedToken.id }});
    res.status(200).send(`Authed as ${user.fName}`)
  }
  catch(e){
    res.sendStatus(401);
  }
  
});


module.exports = db; 