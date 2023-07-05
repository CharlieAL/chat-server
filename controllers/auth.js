const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
  const { email, password } = req.body
  try {
    const emailExist = await User.find({ email })

    if (emailExist.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está en uso'
      })
    }

    const user = User(req.body)
    //encrypt password

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    user.password = passwordHash

    await user.save()

    const token = await generateJWT(user.id)

    res.json({
      ok: true,
      user,
      token
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    })
  }
}

const login = async (req, res = response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'credenciales incorrectas e'
      })
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'credenciales incorrectas p'
      })
    }
    const token = await generateJWT(user.id)
    res.json({
      ok: true,
      user,
      token
    })
  } catch (error) {
    console.log(error)
    res.json({
      ok: false,
      msg: 'error en el servidor, revisar l'
    })
  }
}

const renewToken = async (req, res = response) => {
  try {
    const uid = req.uid

    const token = await generateJWT(uid)

    const user = await User.findById(uid)

    res.json({
      ok: true,
      user,
      token
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    })
  }
}

module.exports = {
  createUser,
  login,
  renewToken
}
