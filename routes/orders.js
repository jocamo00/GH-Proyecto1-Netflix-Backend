const mongoose = require('mongoose')
const express = require('express');
const auth = require('../middleware/auth')
const Role = require('../helpers/role')
const authorize = require('../middleware/role')
const Order = require('../models/order')
const Region = require('../models/region')
const User = require('../models/user')
const Movie = require('../models/movie')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todas los pedidos
// En el array le indicamos por los middlewares que quemos que pase ( se ejecutan por orden)
// Indicamos a que roles queremos darle acceso
router.get('/', [auth, authorize([Role.Admin])], async(req, res)=> {
  const orders = await Order.find()
  res.send(orders)
}) 
//#endregion


//#region  Listar pedido por id
router.get('/:id', [auth, authorize([Role.Admin])], async(req, res) => {
  // recoje el id de la url
  const order = await Order.findById(req.params.id)
  if(!order) return res.status(404).send('No hemos encontrado un pedido con ese ID')
  res.send(order)
})
//#endregion


//#region Filtrar pedidos por id de usuario
router.get('/user/:id', [auth, authorize([Role.Admin])], async(req, res)=> {
  const order = await Order.find({'user._id': req.params.id})
  res.send(order)
}) 
//#endregion


//#region Filtrar pedidos por el nombre del usuario
router.get('/user/name/:firstname', [auth, authorize([Role.Admin])], async(req, res)=> {
  const order = await Order.find({'user.firstName': req.params.firstname})
  res.send(order)
}) 
//#endregion


//#region Filtrar pedidos por el nombre y apellidos del usuario
router.get('/user/name/:firstname/:lastname1/:lastname2', [auth, authorize([Role.Admin])], async(req, res)=> {
  const order = await Order.find({'user.firstName': req.params.firstname, 'user.lastName1': req.params.lastname1, 'user.lastName2': req.params.lastname2})
  res.send(order)
}) 
//#endregion


//#region Introducir pedido, datos Embebido
router.post('/', [auth, authorize([Role.Admin, Role.User])], async (req, res)=> {

  // Comprobamos de que existe y lo recogemos
  const user = await User.findById(req.body.userId)
  if(!user) return res.status(400).send('No tenemos ese usuario')

  // Comprobamos de que existe y lo recogemos
  const movie = await Movie.findById(req.body.movieId)
  if(!movie) return res.status(400).send('No tenemos esa pelicula')

  // Comprobamos de que existe y lo recogemos
  const region = await Region.findById(req.body.regionId)
  if(!region) return res.status(400).send('No tenemos esa región')
  
  const order = new Order({
    /*movie: movie,
    user: user,
    region: region*/
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName1: user.lastName1,
      lastName2: user.lastName2,
      email: user.email
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      price: movie.price
    },
    region: {
      _id: region._id,
      name: region.name
    }
  })

  // Para asegurar que se hacen correctamente los diferentes guardados lo encapsulamos en una transacción
  // Si hubiera algun fallo la transacción no se haria
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    // Guarda el pedido
    const result = await order.save()
    await session.commitTransaction()
    session.endSession()

    res.status(201).send(result)
  } catch (e) {
      await session.abortTransaction()
      session.endSession()
      res.status(500).send(e.message)
  }
})
//#endregion



//#region Editar el pedido seleccionada por id  
router.put('/:id', [auth, authorize([Role.Admin])], async (req, res)=> {

  // Comprobamos de que existe y lo recogemos
  const user = await User.findById(req.body.userId)
  if(!user) return res.status(400).send('No tenemos ese usuario')

  // Comprobamos de que existe y lo recogemos
  const movie = await Movie.findById(req.body.movieId)
  if(!movie) return res.status(400).send('No tenemos esa pelicula')

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
router.delete('/:id', [auth, authorize([Role.Admin])], async (req, res) => {

  const order = await Order.findByIdAndDelete(req.params.id)
  
  if(!order){
    return res.status(404).send('El pedido con ese ID no esta, no se puede eliminar');
  }
  
  res.status(200).send('pedido borrado');
})
//#endregion




module.exports = router;