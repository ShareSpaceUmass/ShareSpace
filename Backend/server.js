const express = require("express");
const sendGridMailer = require("@sendgrid/mail")
sendGridMailer.setApiKey(process.env.SENT_GRID_API_KEY)
const mysql = require("mysql2");
const jwt = require("jsonwebtoken")
const app = express();
const port = '3000';

app.use(express.json());

// Should be moved
const JWT_ACCESS_SECRET = "5e5e3cf59ab303a05498dede2e6063d9aee36a04de7e79b4cd50eba220b9e1e625c8f29769c6a1e3a199aa87facef6d6de118013cbd6ce1fb3912baa75658e79";

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
app.post("/createDatabase", (req, res) => {
  let sql = 'CREATE DATABASE userDatabase';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("Database created!");
  })
});

//Create table
app.post('/createUserTable', (req, res) => {
  let sql = 'CREATE TABLE users(id INT Primary KEY AUTO_INCREMENT, email VARCHAR(255), password CHAR(30), username CHAR(20), bio VARCHAR(255))';
  db.query(sql, (err, result) => {
    if(err) return console.error('error: ' + err.message);
    console.log(result);
    res.send("users table created!");
  });
});

//Handle reigstration
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const bio = req.body.bio;

  db.query(
    "INSERT INTO users (email, password, username, bio) VALUES (?, ?, ?, ?)", [email, password, username, bio], 
    (err, result) => {
      if(err) return console.error('error: ' + err.message);
      console.log(result);
      res.send("user added!");
    }
  );
});

//Handle login
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?', [username, password],
    (err, result) => {
      if(err) return console.error('error: ' + err.message);
      if(result)
        res.send(result);
      else
        res.send("Wrong username/password combination.");
    }
  );
});

app.post("/login", async (req, res) => {
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

  res.json("Check your email to finish logging in")
})

function sendMagicLinkEmail({email, token}) {
  return sendGridMailer.send({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Finish Logging In",
    html: `<a href = "http://localhost:3000/verify?token=${token}">Log in</a>`,
  })
}

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
app.post('/updateUser/:userId/:field/:value', (req, res) => {
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

// Verifies token given in URL
app.get("/verify", (req, res) => {
  const token = req.query.token;
  if(token == null) res.sendStatus(401);
  try{
    const decodedToken = jwt.verify(token, JWT_ACCESS_SECRET);
  }
  catch(e){
    res.sendStatus(401);
  }
  
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
