const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./db/database");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi, this is the root route");
});

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    
    app.listen(3000)})  
  .catch((err) => {
    console.log(err);
  });
