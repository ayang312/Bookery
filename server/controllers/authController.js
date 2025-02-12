const dotenv = require("dotenv");
const prisma = require("../config/db");
const bcrypt = require('bcrypt');

// Login function
const login = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const response = await prisma.user.findFirstOrThrow({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });


  } catch (error) {
    next({
      statusCode: 404,
      message: "User not found in system!",
    });
  }
};

module.exports = { login };
