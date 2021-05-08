require('./config/config');

const express = require('express');
const app = express();

//Middlewares
app.use(express.json());

//Rutas
app.use(require('./routes/index'));


//Empezar el servidor
app.listen(process.env.PORT, () => {
    console.log('La aplicacion esta corriendo en puerto ', process.env.PORT)
});