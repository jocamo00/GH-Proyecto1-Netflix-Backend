const { Genre } = require('../models/genre')


const GenreController = {
    
    async getAll(req, res) {
        try {
            const genres = await Genre.find()
            res.send(genres)
        } catch (error) {
            res.status(404).send(error.message)
          }
    },
    async getId(req, res) {
        try {
            // recoje el id de la url
            const genre = await Genre.findById(req.params.id)
            res.send(genre)
        } catch (error) {
            res.status(404).send('No hemos encontrado un género con ese ID' + '\n' + error.message)
          }
    },
    async getGenrePopular(req, res) {
        try {
            const genres = await Genre.find({popular: req.params.popular})
            res.send(genres)

        } catch (error) {
            res.status(404).send('No hemos encontrado generos populares' + '\n' + error.message)
          }
    },
    async insert(req, res) {
        try {
            const genre = new Genre({
                name: req.body.name
              })
            
              // Guarda el género
              const result = await genre.save()
              res.status(201).send(result)
        } catch (error) {
            res.status(404).send('No se ha podido insertar el genéro' + '\n' + error.message)
          }
    },
    async updateId(req, res) {
        try {
            const genre = await Genre.findByIdAndUpdate(req.params.id, {
                name: req.body.name
            },
            {
              // Devuelve el documento modificado
              new: true
            })
            res.status(204).send()
        } catch (error) {
            return res.status(404).send('El género con ese ID no esta' + '\n' + error.message);
          }
    },
    async deleteId(req, res) {
        try {
            const genre = await Genre.findByIdAndDelete(req.params.id)
            res.status(200).send('género borrado');
        } catch (error) {
            res.status(404).send('El género con ese ID no está, no se puede eliminar');
          }
    }
}


module.exports = GenreController;