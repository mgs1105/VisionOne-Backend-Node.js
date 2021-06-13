// mysql es un modulo de node.js que nos permite conectarnos a una base de datos de MySQL
const mysql = require('mysql');

//Conexion a base de datos
//creamos una variable llamada "conecction" que tomara todos los parametros de la conexion a la BD
var conecction = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "vision_one",
    port: "3306"
})

//verificamos si la conexion es correcta o no. si encuentra algun error mandara por consola el mensaje de ERROR.
conecction.connect((err) => {
    if (err) {
        console.log('ERROR!!!');
        return;
    } else {
        console.log('Conectado!!');
    }
})

// exportamos la variable "conecction" para que pueda ser usada a lo largo de toda la app.
module.exports = conecction;