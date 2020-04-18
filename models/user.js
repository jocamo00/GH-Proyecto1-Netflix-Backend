const jwt = require('jsonwebtoken')
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
    lastName1: {
        type: String,                      
        minlength: 1,                      
        maxlength: 99,                  
        trim: true,                         
        required: true
    },
    lastName2: {
        type: String,                      
        minlength: 1,                      
        maxlength: 99,                  
        trim: true,                         
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 99,
        require: true
    },
    email: {
        type: String,                      
        minlength: 1,                      
        maxlength: 99,                  
        trim: true,
        required: true,
        unique: true                      
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


  // Genera el token, le pasamos los datos que queramos enviar y la key
  // Generar variable de entorno = export SECRET_KEY_JWT_NETFLIX_API=key
  userSchema.methods.generateJWT = function() {
    return jwt.sign({ _id: this._id, 
                      firstName: this.firstName }, process.env.SECRET_KEY_JWT_NETFLIX_API='000000')
  }
  //#endregion
  
  
  //#region Definición del modelo
  const User = mongoose.model('user', userSchema)
  //#endregion


  module.exports.User = User
  module.exports.userSchema = userSchema
