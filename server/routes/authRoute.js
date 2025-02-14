const { login, register, logout } = require("../controllers/authController");
const { isLoggedIn } = require("../middlewares/authenticate");
const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", isLoggedIn, logout);

module.exports = router;
