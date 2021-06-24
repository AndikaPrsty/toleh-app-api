/*
  Warnings:

  - Added the required column `jam_buka` to the `toko` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam_tutup` to the `toko` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "toko" ADD COLUMN     "jam_buka" VARCHAR(5) NOT NULL,
ADD COLUMN     "jam_tutup" VARCHAR(5) NOT NULL;
