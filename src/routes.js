const express = require('express');
const healthCheck = require('./controllers/healthCheck');
const usersController = require('./controllers/users');
const transactionsController = require('./controllers/transactions');
const restaurantController = require('./controllers/restaurants');
const authentication = require('./configs/server/authentication');

const router = express.Router();

router.get('/status', authentication.apiKey, healthCheck.status);

router.post('/user/register', authentication.apiKey, usersController.register);
router.post('/user/login', authentication.apiKey, usersController.login);
router.get('/user/logout', authentication.userToken, usersController.logout);
router.get('/user/transactions', authentication.userToken, transactionsController.userTransactions);

router.get('/restaurant/locate', authentication.userToken, restaurantController.locate);

module.exports = router;
