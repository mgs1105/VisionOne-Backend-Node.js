const express = require('express');
const router = express.Router();
//bcrypt es un modulo de node que sirve para encriptar las contraseñas y dar mayor seguridad. 
const bcrypt = require('bcryptjs');

const conexion = require('./../database/database');

//FUNCION N°1 => Obtenemos todos los registros de la tabla usuario
// definimos una peticion get al localholst:5000/USUARIO. la peticion tendra un request y un response.
router.get('/usuario', (req, res) => {

    //Creamos la consulta SQL a la base de datos.
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

    //obtenemos todos los datos de un unico usuario mediante su Rut, por ende, se debe recibir en la url.
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

    //Creamos un nuevo usuario obteniendo sus datos desde el body.
    const Rut = req.body.Rut;
    const Rol = req.body.Rol;
    const Password = req.body.Password;
    const Bodega = req.body.Bodega;

    //encriptar Password
    //creamos una constante llamada "vueltas" que tendra las propiedades de la funcion genSaltSync.
    //esta funcion especifica el numero de vueltas que se le dara al password para encriptarlo.
    //si no se especifica un numero por defecto es el 10.
    const vueltas = bcrypt.genSaltSync();
    //creamos otra constante llamada "pass". Esta constante tendra las propiedades de la funcion "hashSync"
    //esta funcion recibe 2 parametros. El primero es el password que queremos encriptar, en este caso el password enviado por el cliente
    //el segundo pararmetro es la cantidad de vueltas que se le dara al password para encriptarlo
    //como resultado la constante "pass" sera el password encritado.
    const pass = bcrypt.hashSync(Password, vueltas);

    //realizamos la consulta SQL para añadir un usuario.
    //OJO: el ultimo valor que se manda es "pass" y no "Password", osea, guardamos el pass encriptado en la BD
    conexion.query("INSERT INTO usuario (Rut, Rol, Password, Bodega) VALUES (?, ?, ?, ?)", [Rut, Rol, pass, Bodega], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Usuario Agregado' });
        } else {
            console.log(err);
        }
    });

});

//Funcion N°4 => Actualizamos un registro de la tabla usuario
router.put('/usuario/:Rut', (req, res) => {

    //Para actualizar un usuario debemos recibir su rut en la url para solo aplicar los cambios a el
    //los valores que se modificaran seran recibidos desde el body.
    const Rut = req.params.Rut;
    const Rol = req.body.Rol;
    const Bodega = req.body.Bodega;

    //Creamos la consulta SQL
    conexion.query("UPDATE usuario set Rol = ?, Bodega = ? WHERE Rut = ?", [Rol, Bodega, Rut], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Usuario Actualizado' });
        } else {
            console.log(err);
        }
    });
});

//Funcion N°5 => Eliminamos un registro de la tabla usuario
router.delete('/usuario/:Rut', (req, res) => {

    //Recibimos el rut del usuario por la URL para aplicar la eliminacion solo a ese usuario
    const Rut = req.params.Rut;

    //Creamos la consulta SQL
    conexion.query("DELETE FROM usuario WHERE Rut = ?", [Rut], (err, rows) => {
        if (!err) {
            res.json({ Status: 'Usuario eliminado con exito' });
        } else {
            console.log(err);
        }
    });

});

//Funcion N°6 => Login de usuario
router.post('/login', (req, res) => {

    //Recibimos los datos desde el body para almacenarlos en las variables Rut y pass
    let Rut = req.body.Rut;
    let pass = req.body.Password;

    //Creamos la consulta SQL donde seleccionamos un registro de la tabla usuario donde el Rut coincida con algun registro.
    conexion.query("SELECT * FROM usuario WHERE Rut = ?", [Rut], (err, rows, field) => {
        if (err) {
            console.log('Error', err);
        } else {
            //Usamos el modulo de bcrypt. en este caso con la funcion "compareSync"
            //Dicha funcion recibe 2 parametros:
            //1. El password del body con el que queremos realizar el login
            //2. El password del usuario que coincida con el rut que estamos ingresando
            //la funcion compara los dos password, si son iguales devuelve true, si son distintos devuelve False
            if (bcrypt.compareSync(pass, rows[0].Password)) {
                res.json(true)
            } else {
                res.json(false)
            }
        }
    });

});

module.exports = router;