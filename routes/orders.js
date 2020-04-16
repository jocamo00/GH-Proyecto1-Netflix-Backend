const mongoose = require('mongoose')
const express = require('express');
const Order = require('../models/order')
const { Region } = require('../models/region')
const { User } = require('../models/user')
const { Movie } = require('../models/movie')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todas los pedidos
router.get('/', async(req, res)=> {
  const orders = await Order.find()
  res.send(orders)
}) 
//#endregion


//#region  Listar pedido por id
router.get('/:id', async(req, res) => {
  // recoje el id de la url
  const order = await Order.findById(req.params.id)
  if(!order) return res.status(404).send('No hemos encontrado un pedido con ese ID')
  res.send(order)
})
//#endregion


//#region Introducir pedido, datos Embebido
router.post('/', async (req, res)=> {

  // Comprobamos de que existe y lo recogemos
  const movie = await Movie.findById(req.body.movieId)
  if(!movie) return res.status(400).send('No tenemos esa pelicula')

  // Comprobamos de que existe y lo recogemos
  const user = await User.findById(req.body.userId)
  if(!user) return res.status(400).send('No tenemos ese usuario')

  // Comprobamos de que existe y lo recogemos
  const region = await Region.findById(req.body.regionId)
  if(!region) return res.status(400).send('No tenemos esa región')
  
  const order = new Order({
    movie: movie,
    user: user,
    region: region
  })

  // Guarda el pedido
  const result = await order.save()
  res.status(201).send(result)
})
//#endregion



module.exports = router;