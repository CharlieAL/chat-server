const mongoose = require('mongoose')

const conn = {
  isConnected: false
}
mongoose.set('strictQuery', true)

async function dbConnection() {
  if (conn.isConnected) return
  const db = await mongoose.connect(process.env.DB_URL)
  conn.isConnected = db.connections[0].readyState
}

mongoose.connection.on('connected', () => {
  console.log('successfully')
})

mongoose.connection.on('error', (err) => {
  console.log('err')
})

module.exports = {
  dbConnection
}
