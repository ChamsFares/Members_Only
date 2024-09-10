const query = require("../db/queries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { logIn } = require("./passportController");

const validateUser = [
  body("username").isEmail().withMessage("Please Input Valid Email"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords are not same"),
];

exports.createUserGet = (req, res) => {
  res.render("signUpForm");
};

exports.createUserPost = [
  validateUser,
  async (req, res, next) => {
    if (!errorHandler(req, res)) return;
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) return next(err);
        await query.createUser({
          email: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: hashedPassword,
        });
        res.redirect("/");
      });
    } catch (err) {
      return next(err);
    }
  },
];

exports.loginGet = (req, res) => {
  res.render("signInForm");
};

exports.logoutPost = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.loginPost = logIn;

function errorHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send(errors);
    return false;
  }
  return true;
}
