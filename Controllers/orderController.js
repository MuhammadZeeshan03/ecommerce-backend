const Product = require("../models/productModel");
const Order = require("../models/orderModel");

exports.addOrder = async (req, res) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.status(200).json({
        message: "Order added successfully",
      });
    })
    .catch((err) => console.log(err));
};

exports.getOrders = async (req, res) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      console.log("orders");
      res.status(200).json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
};