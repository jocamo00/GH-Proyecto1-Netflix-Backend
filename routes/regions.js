//#region  Requires
const mongoose = require('mongoose')
const express = require('express')
const auth = require('../middleware/auth')
const Role = require('../helpers/role')
const authorize = require('../middleware/role')
const router = express.Router()
const RegionController = require('../controllers/RegionController')
const { check, validationResult } = require('express-validator')
//#endregion


//#region Listar todas las regiones
router.get('/', [auth, authorize([Role.Admin])], RegionController.getAll);
//#endregion


//#region  Listar región por id
router.get('/:id', [auth, authorize([Role.Admin])], RegionController.getId);
//#endregion


//#region Introducir región
  router.post('/', [auth, authorize([Role.Admin])], RegionController.insert);
//#endregion


//#region Editar la region seleccionada por id  
router.put('/:id', [auth, authorize([Role.Admin])], RegionController.updateId);
//#endregion 


//#region Eliminar region por id  
router.delete('/:id', [auth, authorize([Role.Admin])], RegionController.deleteId);
//#endregion


module.exports = router;