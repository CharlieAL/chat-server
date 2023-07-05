const { check } = require('express-validator')
const { createUser, login, renewToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-token')
const { getUsuarios } = require('../controllers/usuarios')

const router = require('express').Router()

router.get('/', validarJWT, getUsuarios)

module.exports = router
