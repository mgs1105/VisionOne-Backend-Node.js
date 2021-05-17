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

    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const StockA = req.body.StockA;
    const StockB = req.body.StockB;
    const StockC = req.body.StockC;
    const Idseccion = req.body.Idseccion;

    conexion.query("INSERT INTO producto (Nombre, Descripcion, StockA, StockB, StockC, Idseccion) VALUES (?, ?, ?, ?, ?, ?)", [Nombre, Descripcion, StockA, StockB, StockC, Idseccion], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Producto agregado con exito' });
            return;
        } else {
            console.log(err);
        }
    });

});

//FUNCION N°3 => Actualizar un producto
router.put('/producto/:Id', (req, res) => {

    const Id = req.params.Id;
    const StockA = req.body.StockA;
    const StockB = req.body.StockB;
    const StockC = req.body.StockC;

    conexion.query("UPDATE producto set StockA = ?, StockB = ?, StockC = ? WHERE Id = ?", [StockA, StockB, StockC, Id], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Producto Actualizado' });
        } else {
            console.log(err);
        }
    });

});

//FUNCION N°4 => Eliminar un producto
router.delete('/producto/:Id', (req, res) => {

    const Id = req.params.Id;

    conexion.query("DELETE FROM producto WHERE Id = ?", [Id], (err, rows) => {
        if (!err) {
            res.json({ status: 'Producto eliminado con exito' });
        } else {
            console.log(err);
        }
    });

});

module.exports = router;