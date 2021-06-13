//Este archivo llamado "app.js" es el principal. el que debemos correr en la termina usando
// => node server/app

// pedimos el archivo que se encuentra en esa ruta para conocer en que puerto correra la app.
// con la palabra reservada 'require' podemos pedir archivos entre carpetas
require('./config/config');

// Express es un modulo de node.js que sirve entre muchas cosas para realizar peticiones HTTP
const express = require('express');
// "express-fileupload" es un modulo de node.js que sirve para procesar archivos como imagenes y guardar una url en la base de datos
const fileUpload = require('express-fileupload');
// para un mayor orden creamos una constante llamada APP donde toma todas las propiedades del servidor express
const app = express();

//Middlewares - lectura y parseo del body
app.use(express.json());

//Middlewares - carga de arcivos
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//Rutas
app.use(require('./routes/index'));


//Empezar el servidor
app.listen(process.env.PORT, () => {
    console.log('La aplicacion esta corriendo en puerto ', process.env.PORT)
});