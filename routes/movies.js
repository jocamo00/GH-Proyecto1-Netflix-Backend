const mongoose = require('mongoose')
const express = require('express');
const { Movie } = require('../models/movie')
const { Genre } = require('../models/genre')
const { Actor } = require('../models/actor')
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



//#region Listar pelicula por titulo
router.get('/title/:title', async(req, res)=> {
  const movies = await Movie.find({title: req.params.title})
  res.send(movies)
}) 
//#endregion



//#region Introducir pelicula, datos Embebido
router.post('/', async (req, res)=> {

  // Comprobamos de que existe y lo recogemos
  const genre = await Genre.findById(req.body.genreId)
  if(!genre) return res.status(400).send('No tenemos ese género')

  // Comprobamos de que existe y lo recogemos
  const actor = await Actor.findById(req.body.actorId)
  if(!actor) return res.status(400).send('No tenemos ese actor')
  
  const movie = new Movie({
    genre: genre,
    actor: actor,
    title: req.body.title,
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

  // Comprobamos de que existe y lo recogemos
  const genre = await Genre.findById(req.body.genreId)
  if(!genre) return res.status(400).send('No tenemos ese género')

  // Comprobamos de que existe y lo recogemos
  const actor = await Actor.findById(req.body.actorId)
  if(!actor) return res.status(400).send('No tenemos ese actor')
    
  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    genre: genre,
    actor: actor,
    title: req.body.title,
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



//#region Eliminar pelicula por id  
router.delete('/:id', async (req, res) => {

    const movie = await Movie.findByIdAndDelete(req.params.id)
    
    if(!movie){
      return res.status(404).send('La pelicula con ese ID no esta, no se puede eliminar');
    }
    
    res.status(200).send('pelicula borrada');
})
//#endregion




module.exports = router;