const router = require("express").Router();
const { getAllUsers } = require('../controllers/adminController');
const { isLoggedIn } = require('../middlewares/authenticate');
const { isAdmin } = require("../middlewares/authorize");

// Get all users
router.get("/users", isLoggedIn, isAdmin, getAllUsers);
// Create new users

// Update users

// Delete users

// Create timeSlots

// Update timeSlots

// Delete timeSlots

// Delete appointments

module.exports = router;