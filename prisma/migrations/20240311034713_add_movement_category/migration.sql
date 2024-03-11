/*
  Warnings:

  - Added the required column `category` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movement" ADD COLUMN     "category" TEXT NOT NULL;
