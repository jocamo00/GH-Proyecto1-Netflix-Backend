# GeeksHubs-Proyecto1-Netflix-Backend

_El proyecto es un Backend, que estructura una aplicación web de alquiler de peliculas, donde se podrán consulatar las diferentes peliculas con todos sus datos, visualizar el trailer y proceder a su alquiler, se podrán realizar:
 * Te podrás registrar y logear.
 * Ver peliculas más populares.
 * Ver peliculas de estreno.
 * Filtrar peliculas por género.
 * Visualizar los trailers.
 * Alquilar una pelicula.
 * El usuario con permisos de Administrador podrá realizar las tareas de  
   creación, eliminación, modificación y filtrado de peliculas, usuario, actores y regiones._

## Comenzando 🚀

_Para obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas, necesitaras descargarlo o clonar el repositorio a tu máquina._


### Tecnologías🛠️

Programas utilizados para el desarrollo y pruebas del proyecto:

* [VSCode] - Editor de código usado - (https://code.visualstudio.com/).
* [Mongoose] - Es un ORM para MongoDB.
* [MongoDB] - Sistema de gestión de bases de datos.
* [node.js] - Entorno multiplataforma para la capa del servidor.
* [Express] - Proporciona herramientas para servidores HTTP.
* [Postman] - Herramienta para el envio de peticiones HTTP REST. (Para realizar pruebas)
* [GitHub] - Control de versiones.


### Instalación 🔧

Requiere [Node.js](https://nodejs.org/) v12+ para ejecutarse.

Una vez descargado, descomprimido y ubicado en el directorio del proyecto, instale las dependencias y devDependencies.

```sh
$ npm install -d
```

Inicie el servidor

```sh
$ npm start
```

Las instrucciones sobre cómo usarlas en su propia aplicación están vinculadas a continuación.
GitHub  [plugins/github/README.md][PlGh] 


#### Código

Conexión Base de Datos
```sh
//#region Conexión a la BD
mongoose.connect('mongodb://localhost:27017/netflixdb', { useNewUrlParser: true, 
                                                          useUnifiedTopology: true, 
                                                          useFindAndModify: false, 
                                                          useCreateIndex: true})

    .then(() => console.log('Conectado correctamente a MongoDB'))
    .catch(() => console.log('Error al conectarse a MongoDB'))
//#endregion
```


Modelo esquema movie
```sh
//#region Definición del schema movie
const movieSchema = new mongoose.Schema({
    genre: {
        type: genreSchema,
        required: true
    },
    actor: {
        type: actorSchema,
        required: true
    },
    title: {
        type: String,                     
        minlength: 1,                   
        maxlength: 99,                  
        trim: true,                        
        required: true                
    },
    premiere: {
        type: Boolean                                           
    },
    popular: {
        type: Boolean                                             
    },
    description: {
        type: String,                      
        minlength: 1,                      
        maxlength: 1500,                  
        trim: true
    },
    poster: {
        type: String,                      
        minlength: 1,                      
        maxlength: 150,                  
        trim: true
    },
    background: {
        type: String,                      
        minlength: 1,                      
        maxlength: 150,                  
        trim: true
    },
    trailerUrl: {
        type: String,                      
        minlength: 1,                      
        maxlength: 150,                  
        trim: true
    },
    length: {
        type: String,
        minlength: 1,                      
        maxlength: 12,                  
        trim: true
    },
    year: {
        type: Number,
        minlength: 4,                      
        maxlength: 4,                  
        trim: true
    },
    rating: {
        type: Number,
        minlength: 1,                      
        maxlength: 5,                  
        trim: true
    },
    price: {
        type: Number,
        minlength: 1,                   
        maxlength: 5,                  
        trim: true,                        
        required: true, 
    },
   mainPopular: {
        type: Boolean
    },
    mainPremiere: {
        type: Boolean
    },
    mainHome: {
        type: Boolean
    },
    numOrders: {
        type: Number
    }
},
{
    timestamps: true 
})
//#endregion
```



Controlador de la ruta que muestra todas las peliculas
```sh
async getAll(req, res) {
        try {
            const movies = await Movie.find()
            res.send(movies)

        } catch (error) {
            res.status(404).send(error.message)
          }
    }
```


Rutas para actor
```sh
//#region Listar todos los actores
router.get('/', [auth, authorize([Role.Admin])], ActorController.getAll);
//#endregion


//#region  Listar actor por id
router.get('/:id', [auth, authorize([Role.Admin])], ActorController.getId);
//#endregion



//#region Introducir actor
router.post('/', [auth, authorize([Role.Admin])], ActorController.insert);
//#endregion



//#region Editar el actor seleccionado por id  
router.put('/:id', [auth, authorize([Role.Admin])], ActorController.updateId);
//#endregion  


//#region Eliminar actor por id  
router.delete('/:id', [auth, authorize([Role.Admin])], ActorController.deleteId);
//#endregion
```


Login
```sh
async login(req, res) {
        try {
            // Recoje el email y comprueba si existe o no
            let user = await User.findOne({email: req.body.email})
            if(!user) return res.status(400).send('Usuarios o contraseña incorrectos')
        
        
            // Se compara el password( el que introduce el usuario con el que tenemos guardado haseado)
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword) return res.status(400).send('Usuario o contraseña incorrectos')
        
        
            // Llama a la función que genera el token
            const jwtToken = user.generateJWT()
        
            // Le pasamos el token 
            res.status(201).header('Authorization', jwtToken)
            //res.status(201).send({jwtToken})
        } catch (error) {
            res.status(404).send(error.message)
          }
    }
```


Encryptación de la contraseña
```sh
const salt = await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash(req.body.password, salt)
```


Middleware que chequea el token del usuario que llega al servidor
```sh
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
```


Middleware que analiza el tipo de rol del usuario, en base a un array de roles que se a establecido
```sh
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
```



## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/jocamo00/GeeksHubs-P5-ToDo.git)

## Versionado 📌

Usamos [GitHub](https://github.com/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/jocamo00/GeeksHubs-P5-ToDo.git).

## Autor ✒️

* **Jose Carreres** - *Todo el trabajo* - [jocamo00](https://github.com/jocamo00)

## Licencia 📄

Este proyecto está bajo la Licencia http://www.apache.org/licenses/LICENSE-2.0









