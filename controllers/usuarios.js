const { response, json } = require('express')
const User = require('../models/user')

const getUsuarios = async (req, res = response) => {
  const usuarios = await User.find({ _id: { $ne: req.uid } }).sort('-online')
  res.status(200).json({
    ok: true,
    usuarios
  })
}

module.exports = {
  getUsuarios
}
