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




module.exports = router;