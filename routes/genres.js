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




module.exports = router;