const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMagicLinkEmail(email, token) {
<<<<<<< HEAD
    return sgMail.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Finish Logging In",
      html: `<a href = "http://localhost:3000/verify?token=${token}">Log in</a>`, // Change API
    })
  }
=======
  return sgMail.send({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Finish Logging In",
    html: `<a href = "https://sharespace-api.onrender.com/verify?email=${email}&token=${token}">Log in</a>`,
  });
}
>>>>>>> e85ca66fabe24a2ad853ed42a1e1d37c7e6dc66e

module.exports = {
  sendMagicLinkEmail,
};
