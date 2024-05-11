const express = require('express');
const app = express();

const authentication= require('./authentication');
const task= require('./task');

app.use('/authentication',authentication);
app.use('/task',task);

module.exports = app;