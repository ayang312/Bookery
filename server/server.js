const app = require('./app');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// connect to port set in .env file
const port = process.env.PORT;

// Connect and listen on specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
