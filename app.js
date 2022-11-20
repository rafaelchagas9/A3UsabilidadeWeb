const express = require('express');
const routes = require('./routes/index');
const {check, validationResult} = require('express-validator/check');

const app = express();
app.set('view engine', 'pug')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);


module.exports = app;