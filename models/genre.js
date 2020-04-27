const mongoose = require('mongoose')

//#region Definición del schema genre
const genreSchema = new mongoose.Schema({
    name: {
        type: String,                     
        minlength: 1,                   
        maxlength: 42,                  
        trim: true,
        required: true                           
    },
    imageUrl: {
        type: String                   
    },
    popular: {
        type: Boolean                   
    },
    timestamps: true
  })
  //#endregion
  
  
  //#region Definición del modelo
  const Genre = mongoose.model('genre', genreSchema)
  //#endregion


  module.exports.Genre = Genre
  module.exports.genreSchema = genreSchema