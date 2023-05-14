const sgMail = require("@sendgrid/mail")
const dotenv = require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendMagicLinkEmail(email, token) {
    return sgMail.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Finish Logging In",
      html: `<a href = "http://localhost:3000/verify?token=${token}">Log in</a>`, // Change API
    })
  }

module.exports = {
    sendMagicLinkEmail
}