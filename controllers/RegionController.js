const Region  = require('../models/region')


const RegionController = {
    
    async getAll(req, res) {
        try {
            const regions = await Region.find()
            res.status(200).send(regions)
        } catch (error) {
            res.status(404).send(error.message)
          }
        
    },
    async getId(req, res) {
        try {
            // recoje el id de la url
            const region = await Region.findById(req.params.id)
            res.status(200).send(region)
        } catch (error) {
            res.status(404).send('No hemos encontrado una región con ese ID' + '\n' + error.message)
          }
    },
    async insert(req, res) {
        try {
            const region = new Region({ 
                name: req.body.name 
            })
            // Guarda la región
            const result = await region.save()
            res.status(201).send(result)
        } catch (error) {
            res.status(404).send('No se ha podido insertar la región' + '\n' + error.message)
          }
    },

    async updateId(req, res) {
        try {
            const region = await Region.findByIdAndUpdate(req.params.id, {
                name: req.body.name
              },
              {
                // Devuelve el documento modificado
                new: true
              })
              
              res.status(204).send()
        } catch (error) {
            res.status(404).send('La región con ese ID no esta' + '\n' + error.message);
          }
    },
    async deleteId(req, res) {
        try {
            const region = await Region.findByIdAndDelete(req.params.id)
            res.status(200).send('región borrada');
        } catch (error) {
            res.status(404).send('La región con ese ID no esta, no se puede eliminar' + '\n' + error.message);
          }
    }
}


module.exports = RegionController;