const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

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

exports.addProductToCart = async (req, res) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
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

exports.deleteProductFromCart = async (req, res) => {
  const productId = req.params.id;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    }).then((products)=>{
      const product = products[0];
      return product.cartItem.destroy();
    }).then((result)=>{
      res.json({message: "Product deleted from cart"});
    })
    .catch(
      (err) => console.log(err)
    );
};
