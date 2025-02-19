const prisma = require("../config/db");
const bcrypt = require("bcrypt");

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Create new user
const createUser = async (req, res, next) => {
  try {
    const { username, password, email, role } = req.body;
    // Hash the password to be stored in database for more security
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role,
      },
    });
    console.log(req.body);
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// Update a user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, email, role } = req.body;

    // Validate the ID
    const userId = parseInt(id, 10); // Convert id to an integer
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Prepare the data object for updating the user info
    const data = {};
    if (username) data.username = username;
    if (email) data.email = email;
    if (role) data.role = role;

    // Hash the password if it's being updated
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    res.status(201).json({
      message: "User Info Successfully Updated!",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "User ID Not Found!" });
    }
    // Validate the ID
    const userId = parseInt(id, 10); // Convert id to an integer
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    res.status(200).json({
      message: "User successfully deleted.",
      user: deletedUser,
    });
  } catch (error) {
    next({ message: "User unsuccessfully deleted", error });
  }
};

// Create a new time slot
const addTimeSlot = async (req, res, next) => {
  try {
    const { date, time } = req.body;

    const newTimeSlot = await prisma.timeSlot.create({
      data: {
        date: new Date(date), //Ensure date is stored as a Date object
        time,
        isBooked: false,
      },
    });
    res.status(201).json({
      message: "Time Slot successfully created",
      timeSlot: newTimeSlot,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a time slot
const deleteTimeSlot = async (req, res, next) => {
  try {
    const { id } = req.params;
    const timeSlotId = parseInt(id, 10);

    const deletedTimeSlot = await prisma.timeSlot.delete({
      where: { id: timeSlotId },
    });
    res.status(200).json({
      message: "Time Slot Successfully deleted",
      timeSlot: deletedTimeSlot,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  addTimeSlot,
  deleteTimeSlot,
};
