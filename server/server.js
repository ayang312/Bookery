require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// connect to port set in .env file
const port = process.env.PORT;

// Connect and listen on specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
