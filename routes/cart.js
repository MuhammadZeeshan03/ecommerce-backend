const express = require("express");

const router = express.Router();

const authenticateToken =
  require("../middleware/authentication").authenticateToken;

const cartController = require("../Controllers/cartController");

// This will return all the products in the cart of the logged in user
router.get("/getCart", authenticateToken, cartController.getCart);

// This will add a product to the cart of the logged in user
// and also check that if the product is already in the cart then it will increase the quantity of the product
router.post(
  "/addProductToCart",
  authenticateToken,
  cartController.addProductToCart
);

// This will delete a product from the cart of the logged in user
router.delete(
  "/deleteProductFromCart/:id",
  authenticateToken,
  cartController.deleteProductFromCart
);

module.exports = router;
