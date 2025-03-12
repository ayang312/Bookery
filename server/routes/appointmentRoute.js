const {
  createAppointment,
  getAllAppointments,
} = require("../controllers/appointmentController");

const router = require("express").Router();

// Create New Appointment
router.post("/", createAppointment);

// Get All Appointments
router.get("/", getAllAppointments);

// Get a single appointment

// Update an appointment

// Delete an appointment

module.exports = router;
