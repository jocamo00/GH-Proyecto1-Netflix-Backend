const User = require('../models//user')
const bcrypt = require('bcrypt')



const UserController = {

    async getAll(req, res) {
        try {
            const users = await User.find()
            res.send(users)

        } catch (error) {
            res.status(404).send(error.message)
          }
    },
    async getId(req, res) {
        try {
            // recoje el id de la url
            const user = await User.findById(req.params.id)
            res.send(user)

        } catch (error) {
            res.status(404).send('No hemos encontrado un usuario con ese ID' + '\n' + error.message)
          }
    },
    async insert(req, res) {
        try {
            // Comprobar que el usuario no este registrado
        // Recoje el email y comprueba si existe o no
        let user = await User.findOne({email: req.body.email})
        if(user) return res.status(400).send('Ese usuario ya existe')
      
        // Hacemos el hash del password, cuando se registra el usuario
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
          
          user = new User({
            firstName: req.body.firstName,
             lastName: req.body.lastName,
                email: req.body.email,
             password: hashPassword,
                 role: 'User',
              address: req.body.address,
              country: req.body.country,
             province: req.body.province,
                  zip: req.body.zip
          })
        
          // Guarda el user
          const result = await user.save()
      
          // Llama a la función que genera el token
          const jwtToken = user.generateJWT()
      
          // Le pasamos el token en el header y le asignamos un clave-valor
          res.status(201).header('Authorization', jwtToken).send({
            // Estos datos no son necesarios ya se los pasamos en el token
            _id: user._id,
            firstName: user.firstName,
            email: user.email
          })
        } catch (error) {
            res.status(404).send('No se ha podido insertar el usuario' + '\n' + error.message)
          }
    },
    async updateId(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                firstName: req.body.firstName,
                 lastName: req.body.lastName,
                    email: req.body.email,
                  address: req.body.address,
                  country: req.body.country,
                 province: req.body.province,
                      zip: req.body.zip
            },
            {
                // Devuelve el documento modificado
                new: true
            })
            res.status(204).send()

        } catch (error) {
            res.status(404).send('El usuario con ese ID no está' + '\n' + error.message);
          }
    },
    async deleteId(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).send('usuario borrado');

        } catch (error) {
            res.status(404).send('El usuario con ese ID no esta, no se puede eliminar' + '\n' + error.message);
          }
    }
}


module.exports = UserController;