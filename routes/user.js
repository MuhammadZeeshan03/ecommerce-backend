const express = require("express");
const router = express.Router();

const hashPassword = require('../middleware/hashPassword')
const userController = require("../Controllers/userController");
const validate = require("../middleware/validation");

const {registerValidation, loginValidation } = require("../middleware/validationSchema");

router.post("/register", validate(registerValidation), hashPassword, userController.register);
router.post("/login", validate(loginValidation), userController.login);


module.exports = router;