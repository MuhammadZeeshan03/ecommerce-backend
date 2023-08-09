const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./db/database");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const CartItem = require("./models/cartItemModel");

const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi, this is the root route");
});

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // Products belongs to a User
User.hasMany(Product); // A User has many Products

User.hasOne(Cart); // one to one relationship
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem }); // many to many relationship
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then((result) => {
    return User.findOne();
  })
  .then((user) => {
    if (!user) {
      return User.create({
        username: "admin",
        email: "test@gmail.com",
        password: "123456",
        role: "admin",
      });
    }
    return user;
  })
  .then((user) => {
   return user.createCart(); // issue is creating cart on each reload  
  }).then((cart)=>{
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

