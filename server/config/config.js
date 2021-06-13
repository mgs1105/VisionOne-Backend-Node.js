//PUERTO
// cuando la app esta en desarrolla el valor de "process.env.PORT" es 0, por ende, toma el valor de puerto 5000
// cuando la app esta en produccion a esta variable "process.env.PORT" se le asigna un puerto aleatorio donde correra la app
//definirlo de esta manera nos otorga mayor seguridad.
process.env.PORT = process.env.PORT || 5000;