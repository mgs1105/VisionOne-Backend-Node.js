const mysql = require('mysql');

//Conexion a base de datos
var conecction = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "vision_one",
    port: "3306"
})

conecction.connect((err) => {
    if (err) {
        console.log('ERROR!!!');
        return;
    } else {
        console.log('Conectado!!');
    }
})

module.exports = conecction;