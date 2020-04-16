const mongoose = require('mongoose')
const express = require('express');
const { Region } = require('../models/region')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todas las regiones
router.get('/', async(req, res)=> {
  const regions = await Region.find()
  res.send(regions)
}) 
//#endregion


//#region  Listar región por id
router.get('/:id', async(req, res) => {
    // recoje el id de la url
    const region = await Region.findById(req.params.id)
    if(!region) return res.status(404).send('No hemos encontrado una región con ese ID')
    res.send(region)
})
//#endregion


//#region Introducir región
router.post('/', async (req, res)=> {

    const region = new Region({
      name: req.body.name
    })
  
    // Guarda la región
    const result = await region.save()
    res.status(201).send(result)
  })
  //#endregion



  //#region Editar la region seleccionada por id  
router.put('/:id', async (req, res)=> {
    
  const region = await Region.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  },
  {
    // Devuelve el documento modificado
    new: true
  })
    
  //si no existe la region
  if(!region){
    return res.status(404).send('La región con ese ID no esta');
  }
    
  res.status(204).send()
})
//#endregion 



//#region Eliminar region por id  
router.delete('/:id', async (req, res) => {

  const region = await Region.findByIdAndDelete(req.params.id)
  
  if(!region){
    return res.status(404).send('La región con ese ID no esta, no se puede eliminar');
  }
  
  res.status(200).send('región borrada');
})
//#endregion



module.exports = router;