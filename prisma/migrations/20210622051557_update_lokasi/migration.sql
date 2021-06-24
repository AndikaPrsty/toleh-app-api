/*
  Warnings:

  - Added the required column `jalan` to the `lokasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lokasi" ADD COLUMN     "jalan" VARCHAR(100) NOT NULL;
