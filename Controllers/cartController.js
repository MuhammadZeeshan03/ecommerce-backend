const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// This will return all the products in the cart of the logged in user
exports.getCart = async (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};
// This will add a product to the cart of the logged in user
// and also check that if the product is already in the cart then it will increase the quantity of the product
exports.addProductToCart = async (req, res) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      if (!cart) {
        return req.user.createCart();
      }
      return cart;
    })
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.json({ message: "Product added to cart" });
    })
    .catch((err) => console.log(err));
};

// This will delete a product from the cart of the logged in user
exports.deleteProductFromCart = async (req, res) => {
  const productId = req.params.id;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.json({ message: "Product deleted from cart" });
    })
    .catch((err) => console.log(err));
};
