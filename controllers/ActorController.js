const { Actor } = require('../models/actor')



const ActorController = {

    async getAll(req, res) {
        try {
            const actors = await Actor.find()
            res.send(actors)
        } catch (error) {
            res.status(404).send(error.message)
          }
        
    },
    async getId(req, res) {
        try {
            // recoje el id de la url
            const actor = await Actor.findById(req.params.id)
            res.send(actor)
        } catch (error) {
            res.status(404).send('No hemos encontrado un actor con ese ID')
        }
    },
    async insert(req, res) {
        try {
            const actor = new Actor({
                firstName: req.body.firstName,
                lastName:  req.body.lastName,
                country:   req.body.country,
                city:      req.body.city
            })
            
            // Guarda el actor
            const result = await actor.save()
              
            res.status(201).send(result)
        } catch (error) {
            res.status(404).send('No se ha podido insertar el actor' + '\n' + error.message)
          }
    },
    async updateId(req, res) {
        try {
            const actor = await Actor.findByIdAndUpdate(req.params.id, {
                firstName: req.body.firstName,
                lastName1: req.body.lastName1,
                lastName2: req.body.lastName2,
                country:   req.body.country,
                city:      req.body.city
            },
            {
                // Devuelve el documento modificado
                new: true
            })

            res.status(204).send()
        } catch (error) {
            res.status(404).send('El actor con ese ID no está' + '\n' + error.message);
          }
        
    },
    async deleteId(req, res) {
        try {
            const actor = await Actor.findByIdAndDelete(req.params.id)
            res.status(200).send('actor borrado');
        } catch (error) {
            res.status(404).send('El actor con ese ID no está, no se puede eliminar' + '\n' + error.message);
        }
    }
}



module.exports = ActorController;