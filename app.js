const express = require('express')
const app = express()

app.use(require('./routes/routes'));
app.set('view engine', 'ejs');

module.exports = app;