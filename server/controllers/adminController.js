const prisma = require("../config/db");

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
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,
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

module.exports = { getAllUsers, createUser };
