const {
  userConnected,
  userDisconnected,
  saveMessage
} = require('../controllers/sockets')
const { comprobarJWT } = require('../helpers/jwt')
const { io } = require('../index')

//Mensaje de Sockets
io.on('connection', (client) => {
  console.log('Cliente conectado')
  const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])
  console.log(valido, uid)

  // Verificar autenticación
  if (!valido) {
    return client.disconnect()
  }

  // Cliente autenticado
  userConnected(uid)

  // Ingresar al usuario a una sala en particular
  // sala global, client.id, 5f298534ad4169714548b785
  client.join(uid)

  // Escuchar del cliente el mensaje-personal
  client.on('mensaje-personal', async (payload) => {
    // TODO: Grabar mensaje
    await saveMessage(payload)
    io.to(payload.para).emit('mensaje-personal', payload)
  })

  client.on('disconnect', () => {
    userDisconnected(uid)
  })

  // client.on('mensaje', ( payload ) => {
  //     console.log('Mensaje', payload);
  //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
  // });
})
