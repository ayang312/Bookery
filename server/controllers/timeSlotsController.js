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
    // destructured req.body
    const { date, time } = req.body;
    const newTimeSlot = await prisma.timeSlot.create({
      data: {
        date: new Date(date),
        time: time,
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
    // req.params
    const { id } = req.params;
    // req.body
    const { isBooked } = req.body;
    const existingTimeSlot = await prisma.timeSlot.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingTimeSlot) {
      return res.status(404).json({ message: "Time Slot Not Found." });
    }

    const updatedTimeSlot = await prisma.timeSlot.update({
      where: { id: parseInt(id) },
      data: { isBooked: isBooked },
    });

    res.status(200).json(updatedTimeSlot);
  } catch (error) {
    next({ message: "Failed to update time slot" });
  }
};

// Delete a time slot
const deleteTimeSlot = async (req, res, next) => {
  try {
    // req.params
    const { id } = req.params;

    await prisma.timeSlot.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Time Slot deleted successfully" });
  } catch (error) {
    next({ message: "Failed to delete time slot" });
  }
};

module.exports = {
  getAllTimeSlots,
  createNewTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};
