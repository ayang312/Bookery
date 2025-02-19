const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/adminController");
const { isLoggedIn } = require("../middlewares/authenticate");
const { isAdmin } = require("../middlewares/authorize");

// Get all users
router.get("/users", isLoggedIn, isAdmin, getAllUsers);

// Create new users
router.post("/users", isLoggedIn, isAdmin, createUser);

// Update users
router.put("/users/:id", isLoggedIn, isAdmin, updateUser);

// Delete users
router.delete("/users/:id", isLoggedIn, isAdmin, deleteUser);

// Create timeSlots

// Update timeSlots

// Delete timeSlots

// Delete appointments

module.exports = router;
