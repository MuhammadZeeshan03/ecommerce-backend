const express = require('express');

const router = express.Router();

const orderController = require('../Controllers/orderController');

const authenticateToken = require('../middleware/authentication').authenticateToken;

router.post('/addOrder', authenticateToken, orderController.addOrder);

router.get('/getOrders',orderController.getOrders);


module.exports = router;