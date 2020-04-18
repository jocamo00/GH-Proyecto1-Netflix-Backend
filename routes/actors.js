const mongoose = require('mongoose')
const express = require('express');
const auth = require('../middleware/auth')
const Role = require('../helpers/role')
const authorize = require('../middleware/role')
const { Actor } = require('../models/actor')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todos los actores
router.get('/', [auth, authorize([Role.Admin])], async(req, res)=> {
  const actors = await Actor.find()
  res.send(actors)
}) 
//#endregion



//#region  Listar actor por id
router.get('/:id', [auth, authorize([Role.Admin])], async(req, res) => {
    // recoje el id de la url
    const actor = await Actor.findById(req.params.id)
    if(!actor) return res.status(404).send('No hemos encontrado un actor con ese ID')
    res.send(actor)
})
//#endregion



//#region Introducir actor
router.post('/', [auth, authorize([Role.Admin])], async (req, res)=> {
    
    const actor = new Actor({
      firstName: req.body.firstName,
      lastName1: req.body.lastName1,
      lastName2: req.body.lastName2,
      country: req.body.country,
      city: req.body.city
    })
  
    // Guarda el actor
    const result = await actor.save()
    
    res.status(201).send(result)
})
//#endregion



//#region Editar el actor seleccionado por id  
router.put('/:id', [auth, authorize([Role.Admin])], async (req, res)=> {
    
    const actor = await Actor.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName1: req.body.lastName1,
      lastName2: req.body.lastName2,
      country: req.body.country,
      city: req.body.city
    },
    {
      // Devuelve el documento modificado
      new: true
    })
    
    //si no existe el actor
    if(!actor){
      return res.status(404).send('El actor con ese ID no esta');
    }
    
    res.status(204).send()
})
//#endregion  



//#region Eliminar actor por id  
router.delete('/:id', [auth, authorize([Role.Admin])], async (req, res) => {

    const actor = await Actor.findByIdAndDelete(req.params.id)
    
    if(!actor){
      return res.status(404).send('El actor con ese ID no esta, no se puede eliminar');
    }
    
    res.status(200).send('actor borrado');
})
//#endregion



module.exports = router;