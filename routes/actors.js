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



module.exports = router;