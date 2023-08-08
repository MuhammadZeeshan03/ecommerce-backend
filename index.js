const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./db/database");
const Product = require("./models/productModel");
const User = require("./models/userModel");

const productRoutes = require("./routes/product");

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

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // Products belongs to a User
User.hasMany(Product); // A User has many Products

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
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
