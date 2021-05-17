const express = require('express');
const router = express.Router();

const conexion = require('./../database/database');

//FUNCION N°1 => Obtenemos todos los registros de la tabla seccion
router.get('/seccion', (req, res) => {

    conexion.query("SELECT * FROM seccion", (err, rows, field) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Error', err);
        }
    });

});

//FUNCION N°2 => Agregar una nueva seccion
router.post('/seccion', (req, res) => {

    //const Id = 5;
    const Nombre = req.body.Nombre;

    conexion.query("INSERT INTO seccion (Nombre) VALUES (?)", [Nombre], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Seccion creada con exito' });
            return;
        } else {
            console.log(err);
        }
    });

});

module.exports = router;