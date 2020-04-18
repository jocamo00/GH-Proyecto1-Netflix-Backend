// chequeo que el login que recibimos del usuario es correcto

const jwt = require('jsonwebtoken')


function auth(req, res, next) {
    // Obtenemos de la request y analiza en el header el método Authorization que es donde nos llega el token
    const jwtToken = req.header('Authorization')

    // En el caso de que no venga nada
    if(!jwtToken) return res.status(401).send('Acceso Denegado. Necesario un token válido')

    // Si el token llega, verifica si es válido, 
    // se le pasa el token que nos ha llegado en la cabecera de la solicitud del usuario
    // le pasamos el secret
    try {
        const payload = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT_NETFLIX_API)
        req.user = payload // para tener el id
        next()
    } catch (e) {
        res.status(400).send('Acceso Denegado. Token no válido')
    }
}


module.exports = auth