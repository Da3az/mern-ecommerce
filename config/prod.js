console.log(pocess.env.MONGODB_URI)

module.exports = {
  mongoDBURI: process.env.MONGODB_URI,
  sessionSecret: process.env.SESSION_SECRET
};