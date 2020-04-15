const mongoose = require('mongoose')
const { genreSchema } = require('./genre')
const { actorSchema } = require('./actor')


//#region Definición del schema film
const movieSchema = new mongoose.Schema({
    title: {
        type: String,                     
        minlength: 1,                   
        maxlength: 99,                  
        trim: true,                        
        required: true                
    },
    genre: {
        type: genreSchema,
        required: true
    },
    actor: {
        type: actorSchema,
        required: true
    },
    premiere: {
        type: Boolean,                                             
        required: true
    },
    description: {
        type: String,                      
        minlength: 1,                      
        maxlength: 1500,                  
        trim: true
    },
    image_url: {
        type: String,                      
        minlength: 1,                      
        maxlength: 99,                  
        trim: true
    },
    length: {
        type: String,
        minlength: 1,                      
        maxlength: 3,                  
        trim: true
    },
    price: {
        type: Number,
        minlength: 1,                   
        maxlength: 5,                  
        trim: true,                        
        required: true, 
    },
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
  })
  //#endregion
  
  
  //#region Definición del modelo
  const Movie = mongoose.model('movie', movieSchema)
  //#endregion


  module.exports = Movie