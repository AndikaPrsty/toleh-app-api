const express = require("express");
const router = express.Router();

const db = require("../database");
const {
  createIdToko,
  createIdUser,
  createIdLokasi,
} = require("../utils/createId");

const addToko = async (req, res) => {
  const {
    id_user,
    nama_toko,
    url_gambar,
    jalan,
    jam_buka,
    jam_tutup,
    latitude,
    longitude,
    kode_pos,
    kabupaten,
    provinsi,
    kecamatan,
    kelurahan,
  } = req.body;

  let idToko = await createIdToko();

  let user;
  try {
    user = await db.user.findFirst({ where: { id: id_user } });
    let toko = await db.toko.findFirst({ where: { id_user } });
    if (user.role != "ADMIN" && toko == null) {
      await db.user.update({ data: { role: "OWNER" }, where: { id: id_user } });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }

  try {
    let toko = await db.toko.create({
      data: {
        id: idToko,
        jam_buka,
        jam_tutup,
        nama_toko,
        url_gambar,
        id_user,
      },
    });
    let idLokasi = await createIdLokasi();
    let lokasi = await db.lokasi.create({
      data: {
        id: idLokasi,
        id_toko: toko.id,
        kabupaten,
        kecamatan,
        kelurahan,
        jalan,
        kode_pos: parseInt(kode_pos),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        provinsi,
        alamat_lengkap: `${jalan}, ${kelurahan}, ${kecamatan}, ${kabupaten}, ${provinsi}, ${kode_pos}`,
      },
    });

    return res.json({ toko, lokasi, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrrong" });
  }
};

const getAllToko = async (req, res) => {
  try {
    let toko = await db.toko.findMany({ include: { Lokasi: true } });

    return res.json(toko);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

router.post("/", addToko);
router.get("/", getAllToko);

module.exports = router;
