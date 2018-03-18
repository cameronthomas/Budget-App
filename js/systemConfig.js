const ip = require('ip')
const ipAddress = ip.address() == "159.65.75.194" ? "159.65.75.194" : 'localhost'
const port = 8080

// Database configs
const dbPort = 5432
const dbUser = 'cameronthomas'
const dbPassword = 'password'
const dbName = 'budgetapp'


module.exports = {
  ipAddress,
  port,
  dbPort,
  dbUser,
  dbPassword,
  dbName
}
