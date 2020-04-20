//#region Requires
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const { check, validationResult } = require('express-validator')
//#endregion



//#region Login usuario
router.post('/', AuthController.login);
//#endregion

module.exports = router