const express = require('express');
const healthCheck = require('./controllers/healthCheck');
const usersController = require('./controllers/users');
const restaurantController = require('./controllers/restaurants');
const authentication = require('./configs/server/authentication');

const router = express.Router();

router.get('/status', authentication.apiKey, healthCheck.status);

router.post('/user/register', authentication.apiKey, usersController.register);
router.post('/user/login', authentication.apiKey, usersController.login);
router.get('/user/logout/:username', authentication.apiKey, usersController.logout);
router.get('/user/transactions/:username', authentication.apiKey, usersController.transactions);

router.get('/restaurant/locate', authentication.apiKey, restaurantController.locate);

module.exports = router;
