const mongoose = require('mongoose')
const express = require('express');
const auth = require('../middleware/auth')
const Role = require('../helpers/role')
const authorize = require('../middleware/role')
const { Genre } = require('../models/genre')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todos los generos
router.get('/', [auth, authorize([Role.Admin])], async(req, res)=> {
  const genres = await Genre.find()
  res.send(genres)
}) 
//#endregion



//#region  Listar género por id
router.get('/:id', [auth, authorize([Role.Admin])], async(req, res) => {
    // recoje el id de la url
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('No hemos encontrado un género con ese ID')
    res.send(genre)
})
//#endregion



//#region Introducir género
router.post('/', [auth, authorize([Role.Admin])], async (req, res)=> {
    
    const genre = new Genre({
      name: req.body.name
    })
  
    // Guarda el género
    const result = await genre.save()
    res.status(201).send(result)
})
//#endregion



//#region Editar el género seleccionado por id  
router.put('/:id', [auth, authorize([Role.Admin])], async (req, res)=> {
  
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    },
    {
      // Devuelve el documento modificado
      new: true
    })
    
    //si no existe el género
    if(!genre){
      return res.status(404).send('El género con ese ID no esta');
    }
    
    res.status(204).send()
})
//#endregion  



//#region Eliminar género por id  
router.delete('/:id', [auth, authorize([Role.Admin])], async (req, res) => {

    const genre = await Genre.findByIdAndDelete(req.params.id)
    
    if(!genre){
      return res.status(404).send('El género con ese ID no esta, no se puede eliminar');
    }
    
    res.status(200).send('género borrado');
})
//#endregion



module.exports = router;