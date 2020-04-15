const mongoose = require('mongoose')
const express = require('express');
const Genre = require('../models/genre')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todos los generos
router.get('/', async(req, res)=> {
  const genres = await Genre.find()
  res.send(genres)
}) 
//#endregion



//#region  Listar género por id
router.get('/:id', async(req, res) => {
    // recoje el id de la url
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('No hemos encontrado un género con ese ID')
    res.send(genre)
})
//#endregion




module.exports = router;