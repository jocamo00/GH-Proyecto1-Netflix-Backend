const mongoose = require('mongoose')
const Order = require('../models/order')
const User = require('../models/user')
const Movie = require('../models/movie')
const Region = require('../models/region')


const OrderController = {

    async getAll(req, res) {
        try {
            const orders = await Order.find()
            res.send(orders)
        } catch (error) {
            res.status(404).send(error.message)
          }
    },
    async getId(req, res) {
        try {
            // recoje el id de la url
            const order = await Order.findById(req.params.id)
            res.send(order)

        } catch (error) {
            res.status(404).send('No hemos encontrado un pedido con ese ID' + '\n' + error.message)
          }
    },
    async getUserId(req, res) {
        try {
            const order = await Order.find({'user._id': req.params.id})
            res.send(order)

        } catch (error) {
            res.status(404).send('No hemos encontrado un pedido con ese ID de usuario' + '\n' + error.message)
          }
    },
    async getUserFirstName(req, res) {
        try {
            const order = await Order.find({'user.firstName': req.params.firstname})
            res.send(order)
        } catch (error) {
            res.status(404).send('No hemos encontrado un pedido con ese usuario' + '\n' + error.message)
          }
    },
    async getUserFirstNameLastName(req, res) {
        try {
            const order = await Order.find({'user.firstName': req.params.firstname, 'user.lastName': req.params.lastname})
            res.send(order)
        } catch (error) {
            res.status(404).send('No hemos encontrado un pedido con ese usuario' + '\n' + error.message)
          }
    },
    async insert(req, res) {
        try {
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
            lastName: user.lastName,
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
        } catch (error) {
            res.status(404).send('No se ha podido insertar el actor' + '\n' + error.message)
          }
    },
    async updateId(req, res) {
        try {
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

            res.status(204).send()

        } catch (error) {
            res.status(404).send('El pedido con ese ID no esta');
          }
    },
    async deleteId(req, res) {
        try {
            const order = await Order.findByIdAndDelete(req.params.id)
            res.status(200).send('pedido borrado');
            
        } catch (error) {
            res.status(404).send('El pedido con ese ID no esta, no se puede eliminar');
          }
    }

}


module.exports = OrderController;