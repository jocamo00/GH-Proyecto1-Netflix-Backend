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





module.exports = router;