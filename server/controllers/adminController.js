const prisma = require("../config/db");
const bcrypt = require('bcrypt');

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

// Delete a user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).json({ message: "User ID Not Found!" });
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

module.exports = { getAllUsers, createUser, deleteUser };
