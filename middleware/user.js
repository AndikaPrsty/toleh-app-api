const jwt = require("jsonwebtoken");
const db = require("../database");
const user = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1];

    let { email } = jwt.verify(token, "toleh_app");

    const user = await db.user.findFirst({ where: { email } });

    delete user.password;
    res.locals.user = user;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err.message });
  }
};

module.exports = user;
