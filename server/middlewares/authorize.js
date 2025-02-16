const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized! Admins only" });
  }
  next();
};

module.exports = { isAdmin };
