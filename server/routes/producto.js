const express = require('express');
const router = express.Router();

const conexion = require('./../database/database');

//FUNCION N°1 => Obtenemos todos los registros de la tabla producto
router.get('/producto', (req, res) => {

    conexion.query("SELECT * FROM producto", (err, rows, field) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Error', err);
        }
    });

});

//FUNCION N°2 => Agregar un nuevo producto
router.post('/producto', (req, res) => {

    const Id = req.body.Id;
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const StockA = req.body.StockA;
    const StockB = req.body.StockB;
    const StockC = req.body.StockC;
    const Idseccion = req.body.Idseccion;

    conexion.query("INSERT INTO producto (Id, Nombre, Descripcion, StockA, StockB, StockC, Idseccion) VALUES (?, ?, ?, ?, ?, ?, ?)", [Id, Nombre, Descripcion, StockA, StockB, StockC, Idseccion], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Producto agregado con exito' });
            return;
        } else {
            console.log(err);
        }
    });

});

module.exports = router;