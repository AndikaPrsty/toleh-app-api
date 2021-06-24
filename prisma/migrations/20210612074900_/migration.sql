/*
  Warnings:

  - You are about to drop the `gambar_produk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jenis_produk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pesan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `telp` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pesan" DROP CONSTRAINT "pesan_id_user_fkey";

-- DropForeignKey
ALTER TABLE "produk" DROP CONSTRAINT "produk_id_jenis_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "telp" VARCHAR(13) NOT NULL;

-- DropTable
DROP TABLE "gambar_produk";

-- DropTable
DROP TABLE "jenis_produk";

-- DropTable
DROP TABLE "pesan";
