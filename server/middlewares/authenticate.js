const dotenv = require("dotenv");
const prisma = require("../config/db");
const jwt = require("jsonwebtoken");

// load env variables
dotenv.config();

// Middleware function for logged in user
const isLoggedIn = async (req, res, next) => {
  try {
    // Get token from the Authorization header
    const authHeader = req.headers.authorization;

    // Extract the jwtoken from the Authorization header of HTTP request ('Bearer <token>')
    const token = req.cookies.token || authHeader.split(" ")[1];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Invalid or missing Authorization header" });
    }

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Remove "Bearer " prefix if token is in cookies
    const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    // Verify token
    try {
      const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

      // Attach the user information to the request object
      req.user = decoded;

      // Proceed to next middleware
      next();
    } catch (error) {
      next({ statusCode: 401, message: "Invalid or expired token" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isLoggedIn,
};
