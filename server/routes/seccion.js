const express = require('express');
const router = express.Router();

const conexion = require('./../database/database');

//FUNCION N°1 => Obtenemos todos los registros de la tabla seccion
// definimos una peticion get al localholst:5000/SECCION. la peticion tendra un request y un response.
router.get('/seccion', (req, res) => {

    //Creamos la consulta SQL a la base de datos.
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
    //asignamos el nombre de la seccion y lo guardamos en una constante llamada Nombre
    const Nombre = req.body.Nombre;

    //realizamos la consulta SQL y creamos la nueva seccion
    conexion.query("INSERT INTO seccion (Nombre) VALUES (?)", [Nombre], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Seccion creada con exito' });
            return;
        } else {
            console.log(err);
        }
    });

});

//FUNCION N°3 => Eliminar una seccion
router.delete('/seccion/:Id', (req, res) => {
    //Al ser una consulta Delete debemos recibir el ID de la secciion por URL para que solo se aplique la eliminacion de dicha seccion
    const Id = req.params.Id;

    conexion.query("DELETE FROM seccion WHERE Id = ?", [Id], (err, rows) => {
        if (!err) {
            res.json({ status: 'Seccion eliminada con exito' });
        } else {
            console.log(err);
        }
    });

})

module.exports = router;