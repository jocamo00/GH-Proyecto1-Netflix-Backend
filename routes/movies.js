const mongoose = require('mongoose')
const express = require('express');
const Movie = require('../models/movie')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todas las peliculas
router.get('/', async(req, res)=> {
  const movies = await Movie.find()
  res.send(movies)
}) 
//#endregion



//#region  Listar pelicula por id
router.get('/:id', async(req, res) => {
    // recoje el id de la url
    const movie = await Movie.findById(req.params.id)
    if(!movie) return res.status(404).send('No hemos encontrado una pelicula con ese ID')
    res.send(movie)
})
//#endregion





module.exports = router;