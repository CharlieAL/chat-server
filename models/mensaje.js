const { Schema, model, models } = require('mongoose')

const mensajeSchema = Schema(
  {
    de: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El nombre es obligatorio']
    },
    para: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El correo es obligatorio']
    },
    mensaje: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

mensajeSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  return object
})

module.exports = models.Mensaje || model('Mensaje', mensajeSchema)
