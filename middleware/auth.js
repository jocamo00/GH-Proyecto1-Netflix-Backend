// chequeo que el login que recibimos del usuario es correcto

const jwt = require('jsonwebtoken')


function auth(req, res, next) {
    // se declara un campo que recibe el request del cliente en el header en el campo Authorization
    let jwtToken = req.header('Authorization')
    if(!jwtToken) return res.status(401).send('Acceso Denegado. No hay token') // si no llega nada en el token no puede hacer el split
    jwtToken = jwtToken.split(' ')[1] //Descartamos bearer y el espacio en blanco (bearer (espacio en blanco) token)
    if(!jwtToken) return res.status(401).send('Acceso Denegado. No hay token')
    
    
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