/*
  Warnings:

  - Added the required column `headquarterBoxId` to the `Box` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Box" ADD COLUMN     "headquarterBoxId" TEXT NOT NULL;
