const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends a magic link email to a given email address.
 * The email contains a link for finishing the login process.
 *
 * @param {string} email - The recipient's email address.
 * @param {string} token - The authentication token for the magic link.
 * @returns {Promise} - A promise that resolves when the email is sent successfully, or rejects with an error.
 */
function sendMagicLinkEmail(email, token) {
  return sgMail.send({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Finish Logging In",
    html: `<a href = "https://sharespace-api.onrender.com/verify?email=${email}&token=${token}">Log in</a>`,
  });
}

module.exports = {
  sendMagicLinkEmail,
};
