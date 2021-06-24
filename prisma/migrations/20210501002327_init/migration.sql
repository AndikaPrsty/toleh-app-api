-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'OWNER');

-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR(50) NOT NULL,
    "uuid" VARCHAR(50) NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "email" VARCHAR(20) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toko" (
    "id" VARCHAR(50) NOT NULL,
    "uuid" VARCHAR(50) NOT NULL,
    "id_user" VARCHAR(50) NOT NULL,
    "nama_toko" VARCHAR(20) NOT NULL,
    "url_gambar" VARCHAR(200) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produk" (
    "id" VARCHAR(50) NOT NULL,
    "uuid" VARCHAR(50) NOT NULL,
    "id_jenis" VARCHAR(50) NOT NULL,
    "id_toko" VARCHAR(50) NOT NULL,
    "nama_produk" VARCHAR(15) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gambar_produk" (
    "id" VARCHAR(50) NOT NULL,
    "uuid" VARCHAR(50) NOT NULL,
    "url_gambar" VARCHAR(200) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lokasi" (
    "id" VARCHAR(50) NOT NULL,
    "uuid" VARCHAR(50) NOT NULL,
    "id_toko" VARCHAR(50) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "alamat_lengkap" VARCHAR(255) NOT NULL,
    "kode_pos" INTEGER NOT NULL,
    "kabupaten" VARCHAR(20) NOT NULL,
    "kecamatan" VARCHAR(20) NOT NULL,
    "kelurahan" VARCHAR(20) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jenis_produk" (
    "id" VARCHAR(50) NOT NULL,
    "uuid" VARCHAR(50) NOT NULL,
    "id_produk" VARCHAR(50) NOT NULL,
    "jenis_produk" VARCHAR(50) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesan" (
    "id" VARCHAR(50) NOT NULL,
    "uuid" VARCHAR(50) NOT NULL,
    "id_user" VARCHAR(50) NOT NULL,
    "pesan" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "toko.nama_toko_unique" ON "toko"("nama_toko");

-- CreateIndex
CREATE UNIQUE INDEX "lokasi_id_toko_unique" ON "lokasi"("id_toko");

-- AddForeignKey
ALTER TABLE "toko" ADD FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produk" ADD FOREIGN KEY ("id_jenis") REFERENCES "jenis_produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produk" ADD FOREIGN KEY ("id_toko") REFERENCES "toko"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lokasi" ADD FOREIGN KEY ("id_toko") REFERENCES "toko"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesan" ADD FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
