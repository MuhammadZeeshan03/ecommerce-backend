const express = require("express");
const hashPassword = require('../middleware/hashPassword')

const router = express.Router();

const userController = require("../Controllers/userController");

router.post("/register", hashPassword, userController.register);

module.exports = router;