//#region Requires
const mongoose = require('mongoose')
const express = require('express')
const auth = require('../middleware/auth')
const Role = require('../helpers/role')
const authorize = require('../middleware/role')
const Order = require('../models/order')
const Region = require('../models/region')
const User = require('../models/user')
const Movie = require('../models/movie')
const OrderController = require('../controllers/OrderController')
const router = express.Router()
const { check, validationResult } = require('express-validator')
//#endregion


//#region Listar todas los pedidos
// En el array le indicamos por los middlewares que quemos que pase ( se ejecutan por orden)
// Indicamos a que roles queremos darle acceso
router.get('/', [auth, authorize([Role.Admin])], OrderController.getAll); 
//#endregion


//#region  Listar pedido por id
router.get('/:id', [auth, authorize([Role.Admin])], OrderController.getId);
//#endregion


//#region Filtrar pedidos por id de usuario
router.get('/user/:id', [auth, authorize([Role.Admin])], OrderController.getUserId); 
//#endregion


//#region Filtrar pedidos por el nombre del usuario
router.get('/user/name/:firstname', [auth, authorize([Role.Admin])], OrderController.getUserFirstName);
//#endregion


//#region Filtrar pedidos por el nombre y apellidos del usuario
router.get('/user/name/:firstname/:lastname', [auth, authorize([Role.Admin])], OrderController.getUserFirstNameLastName); 
//#endregion


//#region Introducir pedido, datos Embebido
router.post('/', [auth, authorize([Role.Admin, Role.User])], OrderController.insert);
//#endregion


//#region Editar el pedido seleccionada por id  
router.put('/:id', [auth, authorize([Role.Admin])], OrderController.updateId);
//#endregion 


//#region Eliminar pedido por id  
router.delete('/:id', [auth, authorize([Role.Admin])], OrderController.deleteId);
//#endregion



module.exports = router;