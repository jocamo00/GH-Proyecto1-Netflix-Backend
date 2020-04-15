const mongoose = require('mongoose')
const express = require('express');
const Region = require('../models/region')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todas las regiones
router.get('/', async(req, res)=> {
  const regions = await Region.find()
  res.send(regions)
}) 
//#endregion


//#region  Listar región por id
router.get('/:id', async(req, res) => {
    // recoje el id de la url
    const region = await Region.findById(req.params.id)
    if(!region) return res.status(404).send('No hemos encontrado una región con ese ID')
    res.send(movie)
})
//#endregion


module.exports = router;