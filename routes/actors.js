const mongoose = require('mongoose')
const express = require('express');
const Actor = require('../models/actor')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todos los actores
router.get('/', async(req, res)=> {
  const actors = await Actor.find()
  res.send(actors)
}) 
//#endregion



//#region  Listar actor por id
router.get('/:id', async(req, res) => {
    // recoje el id de la url
    const actor = await Actor.findById(req.params.id)
    if(!actor) return res.status(404).send('No hemos encontrado un actor con ese ID')
    res.send(actor)
})
//#endregion



module.exports = router;