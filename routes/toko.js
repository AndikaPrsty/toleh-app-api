const express = require("express");
const router = express.Router();

const db = require("../database");
const { createIdToko, createIdLokasi } = require("../utils/createId");

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

const getTokoByProduk = async (req, res) => {
  const { cari_produk } = req.body;
  console.log(cari_produk);

  try {
    let toko = await db.toko.findMany({
      where: {
        Produk: { some: { nama_produk: { contains: cari_produk } } },
      },
      include: { Lokasi: true },
      orderBy: { createdAt: "asc" },
    });

    if (toko == null) {
      return res
        .status(404)
        .json({ error: "produk yang anda cari tidak ditemukan" });
    } else {
      console.log(toko);
      return res.json(toko);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
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

const deleteToko = async (req, res) => {
  const { id_toko, id_user } = req.body;

  try {
    let toko = await db.toko.findFirst({ where: { id: id_toko } });
    let user = await db.user.findFirst({ where: { id: id_user } });

    if (toko == null)
      return res.status(404).json({ error: "toko tidak ditemukan" });

    if (toko.id_user == id_user || user.role == "ADMIN") {
      await db.lokasi.delete({ where: { id_toko } });
      await db.toko.delete({
        where: { id: id_toko },
      });
      return res.json({ message: "toko berhasil dihapus" });
    } else {
      return res.json(401).json({ error: "unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.json(500).json({ error: "something went wrong" });
  }
};

const updateToko = async (req, res) => {
  const {
    id_toko,
    id_user,
    jam_buka,
    jam_tutup,
    nama_toko,
    jalan,
    provinsi,
    kabupaten,
    kecamatan,
    kelurahan,
    kode_pos,
  } = req.body;
  try {
    let user = await db.user.findFirst({ where: { id: id_user } });
    let toko = await db.toko.findFirst({ where: { id: id_toko } });

    if (toko == null)
      return res.status(404).json({ error: "toko tidak ditemukan" });

    if (toko.id_user == id_user || user.role == "ADMIN") {
      await db.toko.update({
        where: { id: id_toko },
        data: {
          jam_buka,
          jam_tutup,
          nama_toko,
          Lokasi: {
            update: {
              jalan,
              provinsi,
              kabupaten,
              kecamatan,
              kelurahan,
              kode_pos: parseInt(kode_pos),
              alamat_lengkap: `${jalan}, ${kelurahan}, ${kecamatan}, ${kabupaten}, ${provinsi}, ${kode_pos}`,
            },
          },
        },
      });

      return res.json({ message: "toko berhasil diperbarui" });
    } else {
      return res.status(402).json({ error: "unauthorized" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "somethig went wrong" });
  }
};

const updateLNG = async (req, res) => {
  const { id_toko, id_user, latitude, longitude } = req.body;
  try {
    let toko = await db.toko.findFirst({ where: { id: id_toko } });
    let user = await db.user.findFirst({ where: { id: id_user } });

    if (toko == null)
      return res.status(404).json({ error: "toko tidak ditemukan" });

    if (toko.id_user == user.id || user.role == "ADMIN") {
      await db.toko.update({
        where: {
          id: id_toko,
        },
        data: {
          Lokasi: {
            update: {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            },
          },
        },
      });

      return res.json({ message: "sukses update koordinat" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

const updateGambarToko = async (req, res) => {
  const { id_toko, id_user, url_gambar } = req.body;

  try {
    let user = await db.user.findFirst({ where: { id: id_user } });
    let toko = await db.toko.findFirst({ where: { id: id_toko } });

    if (toko == null) {
      return res.status(404).json({ error: "toko tidak ditemukan" });
    }

    if (toko.id_user == user.id || user.role == "ADMIN") {
      await db.toko.update({
        where: { id: toko.id },
        data: { url_gambar },
      });

      return res.json({ message: "sukses update gambar toko" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

router.post("/", addToko);
router.get("/", getAllToko);
router.post("/delete", deleteToko);
router.post("/update", updateToko);
router.post("/update_koordinat", updateLNG);
router.post("/update_gambar", updateGambarToko);
router.post("/cari_produk", getTokoByProduk);
module.exports = router;
