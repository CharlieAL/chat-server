const Mensaje = require('../models/mensaje')
const User = require('../models/user')

const userConnected = async (uid = '') => {
  try {
    const user = await User.findById(uid)
    user.online = true
    await user.save()
    return user
  } catch (error) {}
}

const userDisconnected = async (uid = '') => {
  try {
    const user = await User.findById(uid)
    user.online = false
    await user.save()
    return user
  } catch (error) {
    console.log('first error', error)
  }
}

const saveMessage = async (payload) => {
  try {
    const mensaje = new Mensaje(payload)
    await mensaje.save()

    return true
  } catch (error) {
    return false
  }
}

module.exports = {
  userConnected,
  userDisconnected,
  saveMessage
}
