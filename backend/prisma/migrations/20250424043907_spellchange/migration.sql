/*
  Warnings:

  - You are about to drop the column `ammenties` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "ammenties",
ADD COLUMN     "amenties" TEXT[];
