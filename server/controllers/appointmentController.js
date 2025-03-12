const prisma = require("../config/db");

// Create Appointment
const createAppointment = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    eventDate,
    primaryVenue,
    secondaryVenue,
    timeSlotId,
  } = req.body;

  try {
    // Check if the time slot is available
    const timeSlot = await prisma.timeSlot.findUnique({
      where: { id: timeSlotId },
    });

    if (!timeSlot || timeSlot.isBooked) {
      return res.status(400).json({ error: "Time Slot is not available" });
    }

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        eventDate: new Date(eventDate),
        primaryVenue,
        secondaryVenue,
        timeSlot: {
          connect: { id: timeSlotId },
        },
      },
    });

    // Mark it as booked
    await prisma.timeSlot.update({
      where: { id: timeSlotId },
      data: { isBooked: true },
    });

    res.status(201).json(appointment);
  } catch (error) {
    next({ message: "Failed to create appointment" });
  }
};

module.exports = { createAppointment };
