const { response } = require('express')
const Mensaje = require('../models/mensaje')

const getChat = async (req, res = response) => {
  try {
    const myId = req.uid
    const messagesFrom = req.params.de

    const last30 = await Mensaje.find({
      $or: [
        { de: myId, para: messagesFrom },
        { de: messagesFrom, para: myId }
      ]
    })
      .sort({ createdAt: 'desc' })
      .limit(30)

    res.json({
      ok: true,
      messages: last30
    })
  } catch (error) {
    console.log('mesajes error', error)
  }
}

module.exports = {
  getChat
}
