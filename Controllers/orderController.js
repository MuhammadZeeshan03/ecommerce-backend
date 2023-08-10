const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// add the cart of the logged in user to the order table
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

// get all the orders of the logged in user
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

// get all the orders
exports.viewAllOrders = async (req, res) => {
  Order.findAll({ include: ["products"] })
    .then((orders) => {
      console.log("orders");
      res.status(200).json(orders);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Something went wrong",
      });
    });
};

exports.getOrderByOrderId = async (req, res) => {
  const orderId = req.params.id;
  Order.findByPk(orderId, { include: ["products"] })
    .then((order) => {
      console.log("order");
      res.status(200).json(order);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Something went wrong",
      });
    });
};
