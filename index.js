const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./db/database");
const product= require("./models/productModel");

const productRoutes = require('./routes/product')

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi, this is the root route");
});

app.use('/product',productRoutes)

sequelize
  .sync()
  .then((result) => {
    app.listen(3000)})  
  .catch((err) => {
    console.log(err);
  });
