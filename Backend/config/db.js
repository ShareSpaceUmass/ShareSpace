const mysql = require("mysql2"); // import the mysql2 library for connecting to a MySQL database
const dotenv = require('dotenv').config(); // import the dotenv library for loading environment variables from a .env file

// Create a pool for the MySQL database using the credentials from the .env file
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

// SQL query to select all rows from the "users" table
let sql = "SELECT * FROM users;";

// Executing the SQL query using the connection pool
pool.execute(sql, function (err, result) {
    if (err) throw err;

    console.log(result);
})

// Export the promise-based pool object for use in other parts of the application
module.exports = pool.promise();