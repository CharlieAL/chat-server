const { check } = require('express-validator')
const { createUser, login, renewToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-token')

const router = require('express').Router()

router.post(
  '/new',
  [
    // middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
  ],
  createUser
)

router.post(
  '/',
  [
    check('email', 'El email no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
  ],
  login
)

router.get('/renew', validarJWT, renewToken)

module.exports = router
