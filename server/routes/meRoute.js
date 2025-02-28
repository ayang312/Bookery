const router = require("express").Router();
const { assistantDashboard } = require("../controllers/meController");
const { isLoggedIn } = require("../middlewares/authenticate");

// Me Route for assistants
router.get("/", isLoggedIn, assistantDashboard);

module.exports = router;
