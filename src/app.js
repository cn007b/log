/**
 * Application.
 *
 * @alias App.
 */

const express = require('express');
const bodyParser = require('body-parser');
const raven = require('raven');

const cors = require('./middlewares/cors');
const xPoweredBy = require('./middlewares/xPoweredBy');
const routes = require('./routes/index');

// Init app.
const app = express();
// Init sentry, for capturing backend errors.
// @see https://sentry.io/log/
raven.config(global.SENTRY_DSN_BACKEND).install();

// Configure app.
app.use(raven.requestHandler());
app.use(express.static('./src/public'));
app.set('views', './src/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
app.use(xPoweredBy);
app.use('/', routes);
app.use(raven.errorHandler());

module.exports = app;
