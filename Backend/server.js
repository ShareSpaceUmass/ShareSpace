const express = require("express");
const jwt = require("jsonwebtoken");
const sendGridMailer = require("@sendgrid/mail")
sendGridMailer.setApiKey(process.env.SENT_GRID_API_KEY)

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const USERS = [
  {
    id: 1, 
    email: "@umass.edu",
    name: "test",
  }
]

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