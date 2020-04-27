//#region Requires
const mongoose = require('mongoose')
const express = require('express');
const auth = require('../middleware/auth')
const Role = require('../helpers/role')
const authorize = require('../middleware/role')
const { Genre } = require('../models/genre')
const GenreController = require('../controllers/GenreController')
const router = express.Router();
const { check, validationResult } = require('express-validator')
//#endregion


//#region Listar todos los genéros
router.get('/', GenreController.getAll);
//#endregion


//#region  Listar género por id
router.get('/:id', GenreController.getId);
//#endregion


//#region  Listar géneros populares
router.get('/genrepopular/:popular', GenreController.getGenrePopular);
//#endregion


//#region Introducir género
router.post('/', [auth, authorize([Role.Admin])], GenreController.insert);
//#endregion


//#region Editar el género seleccionado por id  
router.put('/:id', [auth, authorize([Role.Admin])], GenreController.updateId);
//#endregion  


//#region Eliminar género por id  
router.delete('/:id', [auth, authorize([Role.Admin])], GenreController.deleteId);
//#endregion



module.exports = router;