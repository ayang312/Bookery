const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  addTimeSlot,
  deleteTimeSlot,
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

// Create timeSlot
router.post("/timeslot", isLoggedIn, isAdmin, addTimeSlot);

// Delete timeSlot
router.delete("/timeslot/:id", isLoggedIn, isAdmin, deleteTimeSlot);

// Delete appointment

module.exports = router;
