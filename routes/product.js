const express = require("express");

const router = express.Router();
const authenticateToken =
  require("../middleware/authentication").authenticateToken;

const productController = require("../Controllers/productController");

router.get("/getProducts", authenticateToken, productController.getProducts); // get all products added by a user
router.post("/postProduct", authenticateToken, productController.postProduct); // add a product

router.put(
  "/updateProduct/:id",
  authenticateToken,
  productController.updateProduct
);

router.delete(
  "/deleteProduct/:id",
  authenticateToken,
  productController.deleteProduct
);

module.exports = router;
