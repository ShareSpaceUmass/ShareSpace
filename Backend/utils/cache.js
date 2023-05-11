const NodeCache = require("node-cache");

// Create cache for storing information between multiple requests
// Used for email verification
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
console.log("✅ cache initialized");

module.exports = cache;
