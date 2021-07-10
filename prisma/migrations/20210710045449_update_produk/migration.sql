/*
  Warnings:

  - You are about to drop the column `id_jenis` on the `produk` table. All the data in the column will be lost.
  - Added the required column `url_gambar` to the `produk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produk" DROP COLUMN "id_jenis",
ADD COLUMN     "url_gambar" VARCHAR(200) NOT NULL;
