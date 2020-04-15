//#region require
const mongoose = require('mongoose')
const express = require('express');
const app = express();

const user = require('./routes/users');
const actor = require('./routes/actors');
const genre = require('./routes/genres');
const movie = require('./routes/movies');
const region = require('./routes/regions');
const order = require('./routes/orders');
//#endregion



//Recoje la petición y la convierte en JSON
app.use(express.json());


// Rutas padre
app.use('/api/users/', user);
app.use('/api/actors/', actor);
app.use('/api/genres/', genre);
app.use('/api/movies/', movie);
app.use('/api/regions/', region);
app.use('/api/orders/', order);



//#region Configuración del puerto
const port = process.env.PORT || 3400;
app.listen(port, ()=> console.log(`Escuchando Puerto ${port}`))
//#endregion


//#region Conexión a la BD
mongoose.connect('mongodb://localhost:27017/netflixdb', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('Conectado correctamente a MongoDB'))
    .catch(() => console.log('Error al conectarse a MongoDB'))
//#endregion