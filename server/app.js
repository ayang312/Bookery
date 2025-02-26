const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/adminRoute");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

const app = express();

// Body-parsing Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed methods
    credentials: true, // Allow credentials if needed
  })
);

// Debugging middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Use the imported API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
