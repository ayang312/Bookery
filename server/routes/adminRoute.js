const router = require("express").Router();
const { getAllUsers } = require('../controllers/adminController');
const { isLoggedIn } = require('../middlewares/authenticate');
const { isAdmin } = require("../middlewares/authorize");

router.get("/users", isLoggedIn, isAdmin, getAllUsers);

module.exports = router;