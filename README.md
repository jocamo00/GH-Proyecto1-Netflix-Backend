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



## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/jocamo00/GeeksHubs-P5-ToDo.git)

## Versionado 📌

Usamos [GitHub](https://github.com/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/jocamo00/GeeksHubs-P5-ToDo.git).

## Autor ✒️

* **Jose Carreres** - *Todo el trabajo* - [jocamo00](https://github.com/jocamo00)

## Licencia 📄

Este proyecto está bajo la Licencia http://www.apache.org/licenses/LICENSE-2.0









