const routes = require('express').Router();
const lesson1Controler = require('../controllers/lesson1');

routes.get('/, lesson1Controler.laisRoute');
routes.get('/, lesson1Controler.vileteRoute');

module.exports = routes;