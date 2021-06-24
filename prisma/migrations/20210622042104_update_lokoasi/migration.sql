/*
  Warnings:

  - Added the required column `provinsi` to the `lokasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lokasi" ADD COLUMN     "provinsi" VARCHAR(20) NOT NULL;
