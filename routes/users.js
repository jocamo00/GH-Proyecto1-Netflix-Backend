//#region Requieres
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const express = require('express')
const auth = require('../middleware/auth')
const Role = require('../helpers/role')
const authorize = require('../middleware/role')
const User = require('../models/user')
const UserController = require('../controllers/UserController')
const router = express.Router();
const upload = require('../middleware/file')
const { check, validationResult } = require('express-validator')
//#endregion


//#region Listar todos los usuarios
router.get('/', [auth, authorize([Role.Admin])], UserController.getAll);
//#endregion


//#region  Listar usuario por id
router.get('/:id', UserController.getId);
//#endregion


//#region  Listar usuario por email
router.get('/email/:email', UserController.getEmail);
//#endregion


//#region Introducir usuario
// router.post('/', upload.single('image'), UserController.insert);
router.post('/', UserController.insert);
//#endregion


//#region Editar el usuario seleccionado por id  
router.put('/:id', [auth, authorize([Role.Admin])], UserController.updateId);
//#endregion  


//#region Eliminar usuario por id  
router.delete('/:id', [auth, authorize([Role.Admin])], UserController.deleteId);
//#endregion



module.exports = router;