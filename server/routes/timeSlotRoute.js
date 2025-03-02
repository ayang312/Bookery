const {
  getAllTimeSlots,
  createNewTimeSlot,
  updateTimeSlot,
} = require("../controllers/timeSlotsController");

const router = require("express").Router();

// Get all timeSlots
router.get("/", getAllTimeSlots);

// Create a new timeSlot
router.post("/", createNewTimeSlot);

// Update a timeSlot
router.put("/:id", updateTimeSlot);

// Delete a timeSlot

module.exports = router;
