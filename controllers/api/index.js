const router = require('express').Router();
const homeRoute = require('./homeRoute');
const dashboardRoutes = require('./dashboardRoutes');
const graphRoutes = require('./graphRoutes');
const searchRoutes = require('./searchRoutes');

router.use('./home', homeRoute);
