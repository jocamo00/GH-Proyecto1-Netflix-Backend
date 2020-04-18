const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const express = require('express');
const User = require('../models/user')
const router = express.Router();
const { check, validationResult } = require('express-validator');



//#region Login usuario
router.post('/', async (req, res)=> {

    // Recoje el email y comprueba si existe o no
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Usuarios o contraseña incorrectos')


    // Se compara el password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Usuario o contraseña incorrectos')


    // Llama a la función que genera el token
    const jwtToken = user.generateJWT()

    // Le pasamos el token en el header y le asignamos un clave-valor
    res.status(201).header('Authorization', jwtToken).send({
        // Estos datos no son necesarios ya se los pasamos en el token
        _id: user._id,
        name: user.firstName,
        email: user.email
      })
})


module.exports = router