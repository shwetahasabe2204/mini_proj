/*
  Warnings:

  - You are about to drop the column `createdById` on the `Property` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_createdById_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "createdById";
