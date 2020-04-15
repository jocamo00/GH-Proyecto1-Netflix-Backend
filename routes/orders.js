const mongoose = require('mongoose')
const express = require('express');
const Order = require('../models/order')
const { Movie } = require('../models/movie')
const { User } = require('../models/user')
const { Region } = require('../models/region')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todas los pedidos
router.get('/', async(req, res)=> {
  const orders = await Order.find()
  res.send(orders)
}) 
//#endregion




module.exports = router;