const prisma = require("../config/db");

// Get All timeSlots
const getAllTimeSlots = async (req, res, next) => {
  try {
    const timeSlots = await prisma.timeSlot.findMany();
    res.status(200).json(timeSlots);
  } catch (error) {
    res.status(404).json({ message: "Failed to fetch all time slots" });
  }
};

// Create a new time slot
const createNewTimeSlot = async (req, res, next) => {
  try {
    const newTimeSlot = await prisma.timeSlot.create({
      data: {
        date: new Date(req.body.date),
        time: req.body.time,
      },
    });
    res.status(201).json(newTimeSlot);
  } catch (error) {
    next({ message: "Failed to create new time slot" });
  }
};

// Update a time slot
const updateTimeSlot = async (req, res, next) => {
  try {
    const existingTimeSlot = await prisma.timeSlot.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!existingTimeSlot) {
      return res.status(404).json({ message: "Time Slot Not Found." });
    }

    const updatedTimeSlot = await prisma.timeSlot.update({
      where: { id: req.params.id },
      data: { isBooked: req.body.isBooked },
    });

    res.status(201).json(updatedTimeSlot);
  } catch (error) {
    next({ message: "Failed to update time slot" });
  }
};

module.exports = { getAllTimeSlots, createNewTimeSlot, updateTimeSlot };
