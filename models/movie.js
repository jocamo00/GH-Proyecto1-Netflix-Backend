const mongoose = require('mongoose')
const { genreSchema } = require('./genre')
const { actorSchema } = require('./actor')


//#region Definición del schema movie
const movieSchema = new mongoose.Schema({
    genre: {
        type: genreSchema,
        required: true
    },
    actor: {
        type: actorSchema,
        required: true
    },
    title: {
        type: String,                     
        minlength: 1,                   
        maxlength: 99,                  
        trim: true,                        
        required: true                
    },
    premiere: {
        type: Boolean,                                             
        required: true
    },
    popular: {
        type: Boolean,                                             
        required: true
    },
    description: {
        type: String,                      
        minlength: 1,                      
        maxlength: 1500,                  
        trim: true
    },
    imageUrl: {
        type: String,                      
        minlength: 1,                      
        maxlength: 150,                  
        trim: true
    },
    trailerUrl: {
        type: String,                      
        minlength: 1,                      
        maxlength: 150,                  
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
  //module.exports.movieSchema = movieSchema
