const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./seccion'));
app.use(require('./producto'));

module.exports = app;