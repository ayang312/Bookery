const { login, register, logout } = require("../controllers/authController");
const { isLoggedIn } = require("../middlewares/authenticate");
const router = require("express").Router();

// Login
router.post("/login", login);
// Register
router.post("/register", register);
// Logout
router.post("/logout", isLoggedIn, logout);
// OAuth Register

// Password Reset

module.exports = router;
