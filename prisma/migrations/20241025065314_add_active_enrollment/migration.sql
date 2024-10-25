/*
  Warnings:

  - You are about to drop the column `activeEnrollments` on the `Class` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "activeEnrollments",
ADD COLUMN     "activeEnrollments" INTEGER NOT NULL DEFAULT 0;
