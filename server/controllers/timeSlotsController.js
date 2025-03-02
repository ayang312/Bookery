const prisma = require("../config/db");

// Get All timeSlots
const getAllTimeSlots = async (req, res, next) => {
  try {
    const timeSlots = await prisma.timeSlot.findMany();
    res.status(200).json(timeSlots);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all time slots" });
  };
};

module.exports = { getAllTimeSlots };
