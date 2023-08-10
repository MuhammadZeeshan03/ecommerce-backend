const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/userModel");


exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user)  => {
    if (err) return res.sendStatus(403);
    const userObj =  await User.findByPk(user.id);
    req.user = userObj;

    console.log(user);
    next();
  });
};