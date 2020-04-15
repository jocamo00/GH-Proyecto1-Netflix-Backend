const mongoose = require('mongoose')
const express = require('express');
const Movie = require('../models/movie')
const router = express.Router();
const { check, validationResult } = require('express-validator');


//#region Listar todas las peliculas
router.get('/', async(req, res)=> {
  const movies = await Movie.find()
  res.send(movies)
}) 
//#endregion



//#region  Listar pelicula por id
router.get('/:id', async(req, res) => {
    // recoje el id de la url
    const movie = await Movie.findById(req.params.id)
    if(!movie) return res.status(404).send('No hemos encontrado una pelicula con ese ID')
    res.send(movie)
})
//#endregion



//#region Introducir pelicula
router.post('/', async (req, res)=> {
  
    //Analiza los resultados de la validación del request
    const errors = validationResult(req);
    //Si error llega distinto que vacio es que a encontrado algun error
    if (!errors.isEmpty()) {
      //Devuelve un 422 y en formato json el error
      return res.status(422).json({ errors: errors.array() });
    }
    
    const movie = new Movie({
      title: req.body.title,
      genre: genre,
      actor: actor,
      premiere: req.body.premiere,
      description: req.body.description,
      url_image: req.body.url_image,
      length: req.body.length,
      price: req.body.price
    })
  
    // Guarda la pelicula
    const result = await movie.save()
    
    res.status(201).send(result)
})
//#endregion



//#region Editar la pelicula seleccionada por id  
router.put('/:id', async (req, res)=> {
  
    //Analiza los resultados de la validación del request
    const errors = validationResult(req);
    //Si error llega distinto que vacio es que a encontrado algun error
    if (!errors.isEmpty()) {
      //Devuelve un 422 y en formato json el error
      return res.status(422).json({ errors: errors.array() });
    }
    
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: genre,
        actor: actor,
        premiere: req.body.premiere,
        description: req.body.description,
        url_image: req.body.url_image,
        length: req.body.length,
        price: req.body.price
    },
    {
      // Devuelve el documento modificado
      new: true
    })
    
    //si no existe la pelicula
    if(!movie){
      return res.status(404).send('La pelicula con ese ID no esta');
    }
    
    res.status(204).send()
})
//#endregion 





module.exports = router;