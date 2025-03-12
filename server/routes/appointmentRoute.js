const { createAppointment } = require("../controllers/appointmentController");

const router = require("express").Router();

// Create New Appointment
router.post("/", createAppointment);

module.exports = router;
