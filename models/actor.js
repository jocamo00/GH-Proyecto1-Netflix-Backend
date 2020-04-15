const mongoose = require('mongoose')

//#region Definición del schema actor
const actorSchema = new mongoose.Schema({
    firstName: {
        type: String,                     
        minlength: 1,                   
        maxlength: 42,                  
        trim: true,                        
        required: true,                    
    },
    lastName: {
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
        trim: true
    },
    city: {
        type: String,                      
        minlength: 1,                      
        maxlength: 42,                  
        trim: true
    },
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
  })
  //#endregion
  
  
  //#region Definición del modelo
  const Actor = mongoose.model('actor', actorSchema)
  //#endregion


  module.exports = Actor