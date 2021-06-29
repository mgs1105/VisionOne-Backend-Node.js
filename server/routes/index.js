const express = require('express');
const app = express();

//definimos las distintas rutas que tendra la app. Cada una de ellas contiene las petiticiones HTTP para realizar un CRUD
app.use(require('./usuario'));
app.use(require('./seccion'));
app.use(require('./producto'));
app.use(require('./bodega'));

module.exports = app;