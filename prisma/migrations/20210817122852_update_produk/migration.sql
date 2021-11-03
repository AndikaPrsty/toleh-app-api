/*
  Warnings:

  - A unique constraint covering the columns `[id_toko]` on the table `produk` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `detail_produk` to the `produk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harga_produk` to the `produk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produk" ADD COLUMN     "detail_produk" VARCHAR(15) NOT NULL,
ADD COLUMN     "harga_produk" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "produk.id_toko_unique" ON "produk"("id_toko");
