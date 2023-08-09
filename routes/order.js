const express = require('express');

const router = express.Router();

const orderController = require('../Controllers/orderController');

router.post('/addOrder',orderController.addOrder);

router.get('/getOrders',orderController.getOrders);


module.exports = router;