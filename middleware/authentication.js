const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/userModel");


exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // split the token from the Bearer
  console.log(token);
  if (token == null) return res.sendStatus(401); // if there isn't any token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user)  => {
    if (err) return res.sendStatus(403);
    const userObj =  await User.findByPk(user.id); // find the user in the database
    req.user = userObj; // set the user in the request object

    console.log(user);
    next();
  });
};