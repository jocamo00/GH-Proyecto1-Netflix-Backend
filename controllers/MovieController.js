const Movie = require('../models/movie')
const { Genre } = require('../models/genre')
const { Actor } = require('../models/actor')


const MovieControler = {

    async getAll(req, res) {
        try {
            const movies = await Movie.find()
            res.send(movies)

        } catch (error) {
            res.status(404).send(error.message)
          }
    },
    async getId(req, res) {
        try {
            // recoje el id de la url
        const movie = await Movie.findById(req.params.id)
        res.send(movie)

        } catch (error) {
            res.status(404).send('No hemos encontrado una pelicula con ese ID' + '\n' + error.message)
          }
    },
    async getTitle(req, res) {
        try {
            const movies = await Movie.find({title: req.params.title})
            res.send(movies)

        } catch (error) {
            res.status(404).send('No hemos encontrado una pelicula con ese titulo' + '\n' + error.message)
          }
    },
    async getPremiere(req, res) {
        try {
            const movies = await Movie.find({premiere: req.params.premiere})
            res.send(movies)

        } catch (error) {
            res.status(404).send('No hemos encontrado ninguna pelicula de estreno' + '\n' + error.message)
          }
    },
    async getPopular(req, res) {
        try {
            const movies = await Movie.find({popular: req.params.popular})
            res.send(movies)

        } catch (error) {
            res.status(404).send('No hemos encontrado peliculas populares' + '\n' + error.message)
          }
    },
    async getGenre(req, res) {
        try {
            const movies = await Movie.find({'genre.name': req.params.genre})
            res.send(movies)

        } catch (error) {
            res.status(404).send('No hemos encontrado peliculas' + '\n' + error.message)
          }
    },
    async getActorFirstName(req, res) {
        try {
            const movies = await Movie.find({'actor.firstName': req.params.firstname})
            res.send(movies)

        } catch (error) {
            res.status(404).send('No hemos encontrado peliculas' + '\n' + error.message)
          }
    },
    async getActorFirstNameLastName(req, res) {
        try {
            const movies = await Movie.find({'actor.firstName': req.params.firstname,                             'actor.lastName': req.params.lastname})
            res.send(movies)
        } catch (error) {
            res.status(404).send('No hemos encontrado peliculas' + '\n' + error.message)
          }
    },
    async insert(req, res) {
        try {
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
                popular: req.body.popular,
            description: req.body.description,
               imageUrl: req.body.imageUrl,
             trailerUrl: req.body.trailerUrl,
                 length: req.body.length,
                  price: req.body.price
        })
      
        // Guarda la pelicula
        const result = await movie.save()
        res.status(201).send(result)

        } catch (error) {
            res.status(404).send('No se ha podido insertar la pelicula' + '\n' + error.message)
          }
    },
    async updateId(req, res) {
        try {
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
                    popular: req.body.popular,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                trailerUrl: req.body.trailerUrl,
                    length: req.body.length,
                    price: req.body.price
            },
            {
            // Devuelve el documento modificado
            new: true
            })
            res.status(204).send()

        } catch (error) {
            res.status(404).send('La pelicula con ese ID no esta');
          }
    },
    async deleteId(req, res) {
        try {
            const movie = await Movie.findByIdAndDelete(req.params.id)
            res.status(200).send('pelicula borrada');

        } catch (error) {
            res.status(404).send('La pelicula con ese ID no esta, no se puede eliminar');
          }
    }
}


module.exports = MovieControler;