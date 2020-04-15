const mongoose = require('mongoose')
const express = require('express');
const User = require('../models/user')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todos los usuarios
router.get('/', async(req, res)=> {
  const users = await User.find()
  res.send(users)
}) 
//#endregion


//#region  Listar usuario por id
router.get('/:id', async(req, res) => {
    // recoje el id de la url
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send('No hemos encontrado un usuario con ese ID')
    res.send(user)
})
//#endregion


//#region Introducir user
router.post('/', async (req, res)=> {
  
    //Analiza los resultados de la validación del request
    const errors = validationResult(req);
    //Si error llega distinto que vacio es que a encontrado algun error
    if (!errors.isEmpty()) {
      //Devuelve un 422 y en formato json el error
      return res.status(422).json({ errors: errors.array() });
    }
    
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      country: req.body.country,
      province: req.body.province,
      zip: req.body.zip
    })
  
    // Guarda el user
    const result = await user.save()
    
    res.status(201).send(result)
})
//#endregion


//#region Editar el user seleccionado por id  
router.put('/:id', async (req, res)=> {
  
    //Analiza los resultados de la validación del request
    const errors = validationResult(req);
    //Si error llega distinto que vacio es que a encontrado algun error
    if (!errors.isEmpty()) {
      //Devuelve un 422 y en formato json el error
      return res.status(422).json({ errors: errors.array() });
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      country: req.body.country,
      province: req.body.province,
      zip: req.body.zip
    },
    {
      // Devuelve el documento modificado
      new: true
    })
    
    //si no existe el user
    if(!user){
      return res.status(404).send('El usuario con ese ID no esta');
    }
    
    res.status(204).send()
})
//#endregion  


//#region Delete user por id  
router.delete('/:id', async (req, res) => {

    const user = await User.findByIdAndDelete(req.params.id)
    
    if(!user){
      return res.status(404).send('El usuario con ese ID no esta, no se puede eliminar');
    }
    
    res.status(200).send('usuario borrado');
})
//#endregion



module.exports = router;