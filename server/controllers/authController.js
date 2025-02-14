const dotenv = require("dotenv");
const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login function
const login = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const response = await prisma.user.findFirstOrThrow({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    // Verify the password
    if (!(await bcrypt.compare(req.body.password, response.password))) {
      next({
        statusCode: 401,
        message: "Unauthorized. Incorrect password. Please try again",
      });
    }

    // Create a token
    const token = await jwt.sign(
      { id: response.id, username: response.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h", notBefore: 0 }
    );

    // Remove sensitive data from response object and send the remaining user data back to client
    const { password, resetPassToken, resetPassTokenExpiry, ...rest } =
      response;

    res
      .cookie("token", `Bearer ${token}`, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 3600000),
      })
      .json({
        user: rest,
      });
  } catch (error) {
    next({
      statusCode: 404,
      message: "User not found in system!",
    });
  }
};

// REGISTER function
const register = async (req, res, next) => {
  // destructure the req.body
  const { username, email, password } = req.body;
  try {
    // Validate if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use! Please try again" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        role: "ASSISTANT",
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

// LOGOUT function
const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "strict" }).send({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register, logout };
