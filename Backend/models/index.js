'use strict'; // Use strict mode

// Import the required Node.js modules
const fs = require('fs'); // File system module
const path = require('path'); // Path module
const Sequelize = require('sequelize'); // Sequelize library for database interaction
const process = require('process'); // Process module for environment variables
const basename = path.basename(__filename); // Get the base filename of the current file
const env = process.env.NODE_ENV || 'development'; // Get the current environment from the process environment variable
const config = require(__dirname + '/../config.json')[env]; // Load the database configuration from the config.json file
const db = {}; // Create an empty object to hold the database models

// Initialize the Sequelize object based on the configuration settings
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load all the model files in the current directory and add them to the db object
fs
  .readdirSync(__dirname)
  .filter(file => {
    // Filter out non-JS files, the current file, and test files
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Load the model and add it to the db object
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Call the associate function for each model, if it exists
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add the Sequelize object and Sequelize library to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object for use in other parts of the application
module.exports = db;
