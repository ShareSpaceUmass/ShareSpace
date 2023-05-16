const NodeCache = require("node-cache"); // Require the NodeCache package

// Create cache for storing information between multiple requests
// Used for email verification
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
console.log("✅ cache initialized"); // Log that the cache has been initialized successfully

// Export the cache object for use in other parts of the application
module.exports = cache;
