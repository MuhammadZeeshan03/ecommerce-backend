const express = require('express');

const router = express.Router();

const cartController = require('../Controllers/cartController');

router.get('/getCart',cartController.getCart);
router.post('/addProductToCart',cartController.addProductToCart);

module.exports = router;