const router = require("express").Router();

// User Controller
const { createUser, login, logout } = require("../controllers/user");

// User middleware
const { isLoggedIn } = require("../middlewares/user");

// * User route

// Auth
router.route("/signup").post(createUser);
router.route("/login").post(login);
router.route("/logout").get(isLoggedIn, logout);

module.exports = router;
