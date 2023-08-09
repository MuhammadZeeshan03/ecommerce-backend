const express = require('express');

const router = express.Router();

const cartController = require('../Controllers/cartController');

router.get('/getCart',cartController.getCart);
router.post('/addProductToCart',cartController.addProductToCart);
router.delete('/deleteProductFromCart/:id',cartController.deleteProductFromCart);

module.exports = router;