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


module.exports = router;