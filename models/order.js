const mongoose = require('mongoose')
const { movieSchema } = require('./movie')
const { userSchema } = require('./user')
const { regionSchema } = require('./region')


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
    order_date: {type: Date, default: Date.now},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
  })
  //#endregion
  
  
  //#region Definición del modelo
  const Order = mongoose.model('order', movieSchema)
  //#endregion


  module.exports = Order