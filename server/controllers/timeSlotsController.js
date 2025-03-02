const prisma = require("../config/db");

// Get All timeSlots
const getAllTimeSlots = async (req, res, next) => {
  try {
    const timeSlots = await prisma.timeSlot.findMany();
    res.status(200).json(timeSlots);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all time slots" });
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
    res.status(500).json({ error: "Failed to create new time slot" });
  }
};

module.exports = { getAllTimeSlots, createNewTimeSlot };
