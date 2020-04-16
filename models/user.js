const mongoose = require('mongoose')

//#region Definición del schema user
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,                       // tipo de dato
        minlength: 1,                       // minima longitud
        maxlength: 42,                      // maxima longitud
        trim: true,                         // elimina espacios en blanco innecesarios
        required: true,                     // si es obligatorio
    },
    lastName: {
        type: String,                      
        minlength: 1,                      
        maxlength: 99,                  
        trim: true,                         
        required: true
    },
    email: {
        type: String,                      
        minlength: 1,                      
        maxlength: 99,                  
        trim: true                      
    },
    address: {
        type: String,                      
        minlength: 1,                      
        maxlength: 99,                  
        trim: true,                         
        required: true
    },
    country: {
        type: String,                      
        minlength: 1,                      
        maxlength: 42,                  
        trim: true,                         
        required: true
    },
    province: {
        type: String,                      
        minlength: 1,                      
        maxlength: 42,                  
        trim: true,                         
        required: true
    },
    zip: {
        type: Number,                      
        minlength: 5,                      
        maxlength: 5,                  
        trim: true,                         
        required: true
    },
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
  })
  //#endregion
  
  
  //#region Definición del modelo
  const User = mongoose.model('user', userSchema)
  //#endregion


  module.exports.User = User
  module.exports.userSchema = userSchema
