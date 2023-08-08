const express = require('express');

const router = express.Router();

const productController = require('../Controllers/productController');

router.get('/getProducts',productController.getProducts);
router.post('/postProduct',productController.postProduct);
router.put('/updateProduct/:id',productController.updateProduct);


module.exports = router;