const app = require("../app");

// Logger middleware
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(
    "INFO: ",
    req.method,
    req.hostname,
    req.path,
    req.time,
    req.body,
    req.cookies
  );
  next();
});
