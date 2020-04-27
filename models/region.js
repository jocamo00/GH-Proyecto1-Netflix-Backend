const mongoose = require('mongoose')

//#region Definición del schema region
const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,                       
        maxlength: 42,                      
        trim: true,                        
        required: true
    },
},
{
    timestamps: true 
  })
  //#endregion
  
  
//#region Definición del modelo
const Region = mongoose.model('region', regionSchema)
//#endregion


module.exports = Region
// module.exports.regionSchema = regionSchema
  