const router = require("express").Router();
const { getAllUsers, createUser } = require('../controllers/adminController');
const { isLoggedIn } = require('../middlewares/authenticate');
const { isAdmin } = require("../middlewares/authorize");

// Get all users
router.get("/users", isLoggedIn, isAdmin, getAllUsers);
// Create new users
router.post("/users", isLoggedIn, isAdmin, createUser);

// Update users

// Delete users

// Create timeSlots

// Update timeSlots

// Delete timeSlots

// Delete appointments

module.exports = router;