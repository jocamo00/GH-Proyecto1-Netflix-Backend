// Analiza el tipo de rol
function authorize(roles = []) {
    // Comprueba si lo que recibimos es de tipo string
    if(typeof roles === 'string') {
        // Almacenamos en roles los roles que nos llegan como parámetro
        roles = [roles]
    }

    return [
        (req, res, next) => {
            // Comprueba si el array incluye el rol que nos llega desde el usuario
            if(!roles.includes(req.user.role)) return res.status(403).send('No tienes el rol permitido para acceder a este recurso')
            // Tiene un rol permitido, ejecuta el next del middleware
            next()
        }
    ]
}


module.exports = authorize