const prisma = require("../config/db");

// Assistant Dashboard
const assistantDashboard = async (req, res, next) => {
  try {
    const me = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.user.id,
      },
    });

    const { id, password, ...rest } = me;

    res.json(rest);
  } catch (error) {
    next(error);
  };
};

module.exports = { assistantDashboard };