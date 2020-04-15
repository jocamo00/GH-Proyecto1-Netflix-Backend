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
  


module.exports = router;