const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../database");
const { createIdUser } = require("../utils/createId");

const register = async (req, res) => {
  const { nama, email, password, telp, role } = req.body;

  const id = await createIdUser(role);

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const userExist = await db.user.findFirst({ where: { email } });
    if (userExist) {
      return res.status(400).json({ error: "email sudah terdaftar" });
    } else {
      const user = await db.user.create({
        data: {
          id,
          nama,
          telp,
          email,
          password: hashedPassword,
          role,
        },
      });
      res.json({ user });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log({ email, password });

  try {
    let user = await db.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).json({ error: "email tidak terdaftar" });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        delete user[password];

        let token = jwt.sign(user, "toleh_app", { expiresIn: "10 days" });

        return res.json({ user, token });
      } else {
        return res.status(400).json({ error: "email atau password salah" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
};

const me = async () => {
  const { email } = req.body;
};

router.post("/register", register);
router.post("/login", login);
router.get("/me", me);

module.exports = router;
