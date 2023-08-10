const User = require("../models/userModel");

const bcrypt = require("bcryptjs");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const secret = process.env.ACCESS_TOKEN_SECRET;

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  const existingUser = await User.findOne({
    where: { email: email, username: username },
  });
  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }
  const newUser = new User({
    username: username,
    email: email,
    password: password,
    role: role,
    cart: { items: [] },
  });

  return newUser
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong Like role is not correct",
      });
    });
};

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    where: { username: username },
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    // create token
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

    res.status(200).json({
      message: "Logged in successfully",
      user: user,
      token: token,
    });
  } else {
    // password not match
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
};
