const mongoose = require('mongoose')
const { regionSchema } = require('./region')
const { userSchema } = require('./user')
const { movieSchema } = require('./movie')


//#region Definición del schema movie
const orderSchema = new mongoose.Schema({

    movie: {
        type: movieSchema,
        required: true
    },
    user: {
        type: userSchema,
        required: true
    },
    region: {
        type: regionSchema,
        required: true
    },
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
  })
  //#endregion
  
  
  //#region Definición del modelo
  const Order = mongoose.model('order', orderSchema)
  //#endregion


  module.exports = Order