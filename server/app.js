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
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Use the imported API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
