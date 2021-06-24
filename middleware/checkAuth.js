const jwt = require("jsonwebtoken");

const authCheck = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user) throw new Error("Unauthenticated");
    return next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ error: err.message });
  }
};

module.exports = authCheck;
