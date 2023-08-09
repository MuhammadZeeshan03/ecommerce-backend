const express = require('express');

const router = express.Router();

const authenticateToken = require('../middleware/authentication').authenticateToken;

const cartController = require('../Controllers/cartController');

router.get('/getCart',cartController.getCart);
router.post('/addProductToCart' , authenticateToken , cartController.addProductToCart);
router.delete('/deleteProductFromCart/:id',cartController.deleteProductFromCart);

module.exports = router;