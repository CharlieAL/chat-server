const router = require('express').Router()
const { getChat } = require('../controllers/mensajes')
const { validarJWT } = require('../middlewares/validar-token')

router.get('/:de', validarJWT, getChat)

module.exports = router
