const sendGridMailer = require("@sendgrid/mail")
sendGridMailer.setApiKey(process.env.SENT_GRID_API_KEY)

function sendMagicLinkEmail({email, token}) {
    return sendGridMailer.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Finish Logging In",
      html: `<a href = "http://localhost:3000/verify?token=${token}">Log in</a>`,
    })
  }

module.exports = {
    sendMagicLinkEmail
}