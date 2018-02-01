const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle routes
app.use('/api', routes);

module.exports = app;
