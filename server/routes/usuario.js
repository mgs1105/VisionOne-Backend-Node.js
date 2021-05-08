const express = require('express');
const router = express.Router();

const conexion = require('./../database/database');

//FUNCION N°1 => Obtenemos todos los registros de la tabla usuario
router.get('/usuario', (req, res) => {

    conexion.query("SELECT * FROM usuario", (err, rows, field) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Error', err);
        }
    });

});

//FUNCION N°2 => Obtenemos un regisro de la tabla usuario segun su Rut
router.get('/usuario/:Rut', (req, res) => {

    const Rut = req.params.Rut;

    conexion.query("SELECT * FROM usuario WHERE Rut = ?", [Rut], (err, rows, field) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Error', err);
        }
    });

});

//Funcion N°3 => Insertamos un nuevo registro a la tabla usuario
router.post('/usuario', (req, res) => {

    const Rut = req.body.Rut;
    const Rol = req.body.Rol;
    const Password = req.body.Password;

    conexion.query("INSERT INTO usuario (Rut, Rol, Password) VALUES (?, ?, ?)", [Rut, Rol, Password], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Usuario Agregado' });
        } else {
            console.log(err);
        }
    });

});

//Funcion N°4 => Actualizamos un registro de la tabla usuario

router.put('/usuario/:Rut', (req, res) => {

    const Rut = req.params.Rut;
    const Rol = req.body.Rol;
    const Password = req.body.Password;

    conexion.query("UPDATE usuario set Rol = ?, Password = ? WHERE Rut = ?", [Rol, Password, Rut], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Usuario Actualizado' });
        } else {
            console.log(err);
        }
    });
});

//Funcion N°5 => Eliminamos un registro de la tabla usuario

router.delete('/usuario/:Rut', (req, res) => {

    const Rut = req.params.Rut;

    conexion.query('DELETE FROM usuario WHERE Rut = ?', [Rut], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Usuario eliminado con exito' });
        } else {
            console.log(err);
        }
    });

});


module.exports = router;