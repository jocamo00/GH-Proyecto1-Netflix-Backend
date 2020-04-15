const mongoose = require('mongoose')

//#region Definición del schema region
const regionSchema = new mongoose.Schema({
    name: ["Andalucía","Aragón","Principado de Asturias","Illes Balears","Canarias","Cantabria","Castilla y León",
           "Castilla-La Mancha","Cataluña","Comunidad Valenciana","Extremadura","Galicia","Comunidad de Madrid",
           "Región de Murcia","Comunidad Foral de Navarra","País Vasco","La Rioja","Ciudad Autónoma de Ceuta",
           "Ciudad Autónoma de Melilla"],
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
  })
  //#endregion
  
  
  //#region Definición del modelo
  const Region = mongoose.model('region', regionSchema)
  //#endregion


  module.exports.Region = Region
  module.exports.regionSchema = regionSchema