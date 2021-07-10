const db = require("../database");
const express = require("express");
const { toko } = require("../database");
const router = express.Router();

const getProdukByToko = async (req, res) => {
  const { id_toko } = req.body;

  try {
    let produk = await db.produk.findMany({ where: { id_toko } });

    return res.json({ produk });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: " something went wrong" });
  }
};

const hapusProduk = async (req, res) => {
  const { id_produk, id_toko, id_user } = req.body;

  try {
    let produk = await db.produk.findFirst({ where: { id: id_produk } });
    let toko = await db.toko.findFirst({ where: { id: id_toko } });
    let user = await db.user.findFirst({ where: { id: id_user } });

    if (produk == null) {
      return res.status(404).json({ error: "produk tidak ditemukan" });
    }

    if (
      produk.id_toko == id_toko &&
      (toko.id_user == user.id || user.role == "ADMIN")
    ) {
      db.produk.delete({ where: { id: id_produk } });
      return res.json({ message: "sukses menghapuas produk" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

const updateProduk = async (req, res) => {
  const { id_produk, id_toko, id_user, nama_produk, url_gambar } = req.body;
  try {
    let produk = await db.produk.findFirst({ where: { id: id_produk } });
    let toko = await db.toko.findFirst({ where: { id: id_toko } });
    let user = await db.user.findFirst({ where: { id: id_user } });

    if (produk == null) {
      return res.status(404).json({ error: "produk tidak ditemukan" });
    }

    if (
      produk.id_toko == id_toko &&
      (toko.id_user == user.id || user.role == "ADMIN")
    ) {
      db.produk.update({ data: { nama_produk, url_gambar } });
      return res.json({ message: "sukses mengupdate produk" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

router.post("/", getProdukByToko);
router.post("/delete", hapusProduk);
router.post("/update", updateProduk);

module.exports = router;
