const router = require("express").Router();
const { getAllUsers } = require('../controllers/adminController');
const { isLoggedIn } = require('../middlewares/authenticate');

router.get("/users", isLoggedIn, getAllUsers);

module.exports = router;