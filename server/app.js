const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoutes = require('./routes/authRoute');

// Load environment variables
dotenv.config();

const app = express();

// Body-parsing Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Use the imported API Routes
app.use("/api/auth", authRoutes);



module.exports = app;
