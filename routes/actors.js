//#region Requires
const mongoose = require('mongoose')
const express = require('express')
const auth = require('../middleware/auth')
const Role = require('../helpers/role')
const authorize = require('../middleware/role')
const { Actor } = require('../models/actor')
const ActorController = require('../controllers/ActorController')
const router = express.Router()
const { check, validationResult } = require('express-validator')
//#endregion


//#region Listar todos los actores
router.get('/', [auth, authorize([Role.Admin])], ActorController.getAll);
//#endregion


//#region  Listar actor por id
router.get('/:id', [auth, authorize([Role.Admin])], ActorController.getId);
//#endregion



//#region Introducir actor
router.post('/', [auth, authorize([Role.Admin])], ActorController.insert);
//#endregion



//#region Editar el actor seleccionado por id  
router.put('/:id', [auth, authorize([Role.Admin])], ActorController.updateId);
//#endregion  


//#region Eliminar actor por id  
router.delete('/:id', [auth, authorize([Role.Admin])], ActorController.deleteId);
//#endregion



module.exports = router;