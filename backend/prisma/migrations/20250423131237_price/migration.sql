/*
  Warnings:

  - Added the required column `amountPerFlat` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "amountPerFlat" DECIMAL(65,30) NOT NULL;
