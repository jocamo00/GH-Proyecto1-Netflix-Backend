const mongoose = require('mongoose')


//#region Definición del schema movie
const orderSchema = new mongoose.Schema({

    user: {
        type: new mongoose.Schema({
            firstName: String,
            lastName: String,
            email: String
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: String,
            price: Number
        }),
        required: true
    },
    region: {
        type: new mongoose.Schema({
            name: String
        }),
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