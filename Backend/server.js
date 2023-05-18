// Import required dependencies
const express = require("express"); // Web framework for Node.js
const mysql = require("mysql2"); // MySQL database driver
const jwt = require("jsonwebtoken"); // JSON Web Token library
const cors = require("cors"); // Cross-origin resource sharing middleware
const { getUser } = require("./controllers/userController"); // Import user controller
const { Users } = require("./models"); // Import Sequelize User model
const dotenv = require("dotenv").config(); // Load environment variables
const app = express(); // Create Express app instance
const port = "3000"; // Port number
const db = require("./models"); // Sequelize database connection
const cache = require("./utils/cache"); // Import cache module

app.use(express.json()); // Parse request bodies as JSON
app.use(cors()); // Enable cross-origin resource sharing
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// Sync the Sequelize object relational mapping (ORM) model with the database and start the server
db.sequelize.sync({ alter: true, logging: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

// All user routes are contained in /routes/userRoutes and are used in use user-related requests
app.use("/users", require("./routes/userRoutes"));

// Define route for root path
app.get("/", (req, res) => {
  res.send("Home"); // Send a response with "Home" message
});

// Verifies token given in URL
app.get("/verify", async (req, res) => {
  console.log("Verifying login from email..."); // Log message for verifying login
  const token = req.query.token; // Retrieve token from the query parameter
  if (token == null) res.sendStatus(401); // Send 401 error if no token is provided
  cache.set(req.query.email, true); // Cache the token
  console.log(`${req.query.email} clicked thier login link`); // Log message for login link click
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the JWT_SECRET environment variable
    console.log("token decoded:", decodedToken); // Log message for decoded token
    const user = await Users.findOne({
      where: {
        email: decodedToken.email, // Look up the user by email address
      },
    });
    console.log("✅ User verified:", user.email); // Log message for verified user
    cache.set("token", decodedToken, 10000) // Cache the decoded token
    res.send(`Authed as ${user.email}. You can close this page and continue back to the login page.`); // Send response with authenticated user email message
  } catch (e) {
    console.log("❌ ERROR: verifying login form email", e); // Log error for login verification
    res.sendStatus(401); // Send 401 error if verification fails
  }// Close window
});

module.exports = db; // Export the Sequelize database connection for external use.
