const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Body-parsing Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Simple error-handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? "Internal Server Error";
  res.status(statusCode).json({ message });
});

module.exports = app;
