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
    const {
      id,
      password,
      resetPassToken,
      currentToken,
      resetPassTokenExpiry,
      ...rest
    } = response;

    try {
      // helper function to store generated token in database for temp use
      await addTempToken(id, token);

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
      next(error);
    }
  } catch (error) {
    next({
      statusCode: 404,
      message: "User not found in system!",
    });
  }
};

// REGISTER function
const register = async (req, res, next) => {
    try {
        // Validate if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: req.body.email }
        })

        const response = await prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { login };
