const express = require("express");

const router = express.Router();
const authenticateToken =
  require("../middleware/authentication").authenticateToken;

const productController = require("../Controllers/productController");



router.get('/getAllProducts', productController.getAllProducts); // show all products no need to authenticate
router.get("/getProducts", authenticateToken, productController.getProducts); // get all products added by a user
router.post("/postProduct", authenticateToken, productController.postProduct); // add a product


// can only be accessed by the user who added the product
router.put(
  "/updateProduct/:id",
  authenticateToken,
  productController.updateProduct
);

// can only be accessed by the user who added the product
router.delete(
  "/deleteProduct/:id",
  authenticateToken,
  productController.deleteProduct
);

module.exports = router;
