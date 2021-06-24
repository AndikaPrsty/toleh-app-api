const express = require("express");
const router = express.Router();

const db = require("../database");

const getAllUser = async (_, res) => {
  try {
    let users = await db.user.findMany({
      select: {
        id: true,
        nama: true,
        email: true,
        role: true,
        password: false,
      },
    });

    res.json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
};

router.get("/", getAllUser);

module.exports = router;
