const express = require('express');
//definimos una constante llamada "router" que servira para moverse a lo largo de las rutas definidas
const router = express.Router();

//creamos una constante llamada "conexion" para tener una instancia de la base de datos.
const conexion = require('./../database/database');

//FUNCION N°1 => Obtenemos todos los registros de la tabla producto
// definimos una peticion get al localholst:5000/PRODUCTO. la peticion tendra un request y un response.
router.get('/producto', (req, res) => {

    //Creamos la consulta SQL a la base de datos.
    conexion.query("SELECT * FROM producto", (err, rows, field) => {
        // al especificar un simbolo "!" antes del err, queremos decir "si es que NO ocurre algun error" seguira con las lineas de codigo. 
        if (!err) {
            res.json(rows);
        } else {
            console.log('Error', err);
        }
    });

});

//FUNCION N°2 => Agregar un nuevo producto
router.post('/producto', (req, res) => {

    //asignamos cada valor obtenido del body a una nueva constante para poder realizar un post y crear el producto en la base de datos
    const Nombre = req.body.Nombre;
    const StockA = req.body.StockA;
    const StockB = req.body.StockB;
    const StockC = req.body.StockC;
    const Idseccion = req.body.Idseccion;
    const fotoURL = req.body.fotoURL;

    //definimos la consulta SQL a la base de datos para crear el producto.
    conexion.query("INSERT INTO producto (Nombre, StockA, StockB, StockC, Idseccion, fotoURL) VALUES (?, ?, ?, ?, ?, ?)", [Nombre, StockA, StockB, StockC, Idseccion, fotoURL], (err, rows) => {
        // al especificar un simbolo "!" antes del err, queremos decir "si es que NO ocurre algun error" seguira con las lineas de codigo. 
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

    //al ser una peticion PUT (Actualizar) debemos recibir el Id del producto que queremos actualizar mediante la URL. (req)
    //para que solo aplique cambios a ese producto
    //los cambios que aplicara se reciben desde el body.

    const Id = req.params.Id;
    const StockA = req.body.StockA;
    const StockB = req.body.StockB;
    const StockC = req.body.StockC;

    //creamos la consulta SQL para la base de datos. el orden es importante.
    conexion.query("UPDATE producto set StockA = ?, StockB = ?, StockC = ? WHERE Id = ?", [StockA, StockB, StockC, Id], (err, rows) => {
        // al especificar un simbolo "!" antes del err, queremos decir "si es que NO ocurre algun error" seguira con las lineas de codigo.       
        if (!err) {
            res.json({ Status: 'Producto Actualizado' });
        } else {
            console.log(err);
        }
    });

});

//FUNCION N°4 => Eliminar un producto
router.delete('/producto/:Id', (req, res) => {

    //Al ser una consulta Delete tambien debemos recibir el ID del producto por URL para que solo se aplique la eliminacion a dicho producto
    const Id = req.params.Id;

    //definimos la consulta SQL
    conexion.query("DELETE FROM producto WHERE Id = ?", [Id], (err, rows) => {
        // al especificar un simbolo "!" antes del err, queremos decir "si es que NO ocurre algun error" seguira con las lineas de codigo.    
        if (!err) {
            res.json({ status: 'Producto eliminado con exito' });
        } else {
            console.log(err);
        }
    });

});

//FUNCION N°5 => Obtenemos todos los registros de la tabla producto
router.get('/producto/:query', (req, res) => {

    //esta peticion servira para el buscador de productos en general. Por eso debemos recibir el query (lo que el usuario escribe en el buscador)
    //para ir filtrando la tabla de productos y dar como resultado las sugerencias validas.
    //guardamos lo escrito por el usuario en una constante llamada query.
    const query = req.params.query;

    //creamos una expresion regular(RegExp) para poder filtrar en la tabla
    //las RegExp son patrones que se usan para hacer coincidir una cadena de caracteres con otra.
    // el "i" sirve para que no distinga entre mayusculas y minusculas
    let expresion = new RegExp(`${query}.*`, "i");

    //creamos la consulta SQL a la base de datos.
    conexion.query("SELECT * FROM producto", (err, rows, field) => {
        // al especificar un simbolo "!" antes del err, queremos decir "si es que NO ocurre algun error" ejecutara las siguientes lineas        
        if (!err) {
            //en este punto la variable "rows" contiene todos los productos de la bd sin filtrar 
            //con la propiedad ".filter" podemos filtrar los resultados obtenidos
            //".filter" ejecuta una funcion, donde crea una variable "prod" que tomara el valor de cada producto donde su nombre coincida con la ExpReg que estamos enviando (query)
            let productoFiltrado = rows.filter(prod => expresion.test(prod.Nombre));
            //mandamos como respuesta los productos que coinciden.
            res.json(productoFiltrado);
        } else {
            console.log('Error', err);
        }
    });

});

module.exports = router;