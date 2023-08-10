const express = require('express');

const router = express.Router();

const orderController = require('../Controllers/orderController');

const authenticateToken = require('../middleware/authentication').authenticateToken;


// This will add the cart of the logged in user to the order table
router.post('/addOrder', authenticateToken, orderController.addOrder);

// This will return all the orders of the logged in user
router.get('/getOrders', authenticateToken, orderController.getOrders);

// This will return all the orders
router.get('/viewAllOrders', orderController.viewAllOrders);

router.get('/getOrder/:id', orderController.getOrderByOrderId);

module.exports = router;