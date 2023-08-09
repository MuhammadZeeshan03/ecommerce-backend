const bcrypt = require("bcrypt");

async function hashPassword(req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = hashPassword;
