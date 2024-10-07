/*
  Warnings:

  - You are about to drop the column `workout` on the `Classes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Classes_workout_key";

-- AlterTable
ALTER TABLE "Classes" DROP COLUMN "workout";
