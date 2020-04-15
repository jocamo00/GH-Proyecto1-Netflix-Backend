//#region require
const mongoose = require('mongoose')
const express = require('express');
const app = express();

const user = require('./routes/users');
//#endregion




//Recoje la petición y la convierte en JSOn
app.use(express.json());


// Rutas padre
app.use('/api/users/', user);



//#region Configuración del puerto
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Escuchando Puerto ${port}`))
//#endregion


//#region Conexión a la BD
mongoose.connect('mongodb://localhost:27017/netflixdb', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('Conectado correctamente a MongoDB'))
    .catch(() => console.log('Error al conectarse a MongoDB'))
//#endregion