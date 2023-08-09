const User = require("../models/userModel");

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
        message: "Something went wrong",
      });
    });
};
