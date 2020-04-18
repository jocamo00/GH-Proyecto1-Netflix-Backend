const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const express = require('express');
const Order = require('../models/order')
const { Region } = require('../models/region')
const { User } = require('../models/user')
const { Movie } = require('../models/movie')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todas los pedidos
// Solo podrán realizar consultas de los pedidos cuyos usuarios esten logeados (tenga un token válido)
// le pasamos el middleware para que lo verifique
router.get('/', auth,  async(req, res)=> {
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



//#region Editar el pedido seleccionada por id  
router.put('/:id', async (req, res)=> {

  // Comprobamos de que existe y lo recogemos
  const movie = await Movie.findById(req.body.movieId)
  if(!movie) return res.status(400).send('No tenemos esa pelicula')

  // Comprobamos de que existe y lo recogemos
  const user = await User.findById(req.body.userId)
  if(!user) return res.status(400).send('No tenemos ese usuario')

  // Comprobamos de que existe y lo recogemos
  const region = await Region.findById(req.body.regionId)
  if(!region) return res.status(400).send('No tenemos esa región')
    
  const order = await Order.findByIdAndUpdate(req.params.id, {
    movie: movie,
    user: user,
    region: region
  },
  {
    // Devuelve el documento modificado
    new: true
  })
    
  //si no existe el pedido
  if(!order){
    return res.status(404).send('El pedido con ese ID no esta');
  }
    
  res.status(204).send()
})
//#endregion 



//#region Eliminar pedido por id  
router.delete('/:id', async (req, res) => {

  const order = await Order.findByIdAndDelete(req.params.id)
  
  if(!order){
    return res.status(404).send('El pedido con ese ID no esta, no se puede eliminar');
  }
  
  res.status(200).send('pedido borrado');
})
//#endregion




module.exports = router;