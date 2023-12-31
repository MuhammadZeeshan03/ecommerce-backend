const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./db/database");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const CartItem = require("./models/cartItemModel");
const Order = require("./models/orderModel");
const OrderItem = require("./models/orderItemModel");

const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

// One to One and one to Many relations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // Products belongs to a User
User.hasMany(Product); // A User has many Products

User.hasOne(Cart); // one to one relationship
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem }); // many to many relationship
Product.belongsToMany(Cart, { through: CartItem });

// 1 to Many relationship
Order.belongsTo(User); // 1 order belongs to 1 user
User.hasMany(Order); // 1 user can have multiple orders

Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
