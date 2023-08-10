// Desc: Validation schema for user registration

const { check } = require("express-validator");
const registerValidation = [
    check("username")
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters long")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
    .withMessage("Username must contain at least one number and one special character"),

  check("email").isEmail().withMessage("Please enter a valid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
    .withMessage("Password must contain at least one number and one special character"),
];


// Validation schema for user login
const loginValidation = [
    check("username")
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters long")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
    .withMessage("Username must contain at least one number and one special character"),

    check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
    .withMessage("Password must contain at least one number and one special character"),
];


module.exports = {
    registerValidation,
    loginValidation,
};

