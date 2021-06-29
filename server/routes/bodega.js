const express = require('express');
const router = express.Router();

const conexion = require('./../database/database');

//FUNCION N°1 => Obtenemos todos los registros de la tabla Bodega
// definimos una peticion get al localholst:5000/Bodega. la peticion tendra un request y un response.
router.get('/bodega', (req, res) => {

    conexion.query("SELECT * FROM bodega", (err, rows, field) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Error', err);
        }
    });

});

//FUNCION N°2 => Agregar una nueva bodega
router.post('/bodega', (req, res) => {

    const Nombre = req.body.Nombre;

    conexion.query("INSERT INTO bodega (Nombre) VALUES (?)", [Nombre], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Bodega creada con exito' });
            return;
        } else {
            console.log(err);
        }
    });

});


module.exports = router;