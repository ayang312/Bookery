const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/authenticate");

// Me Route for assistants
router.get("/", isLoggedIn, assistantDashboard);

module.exports = router;
