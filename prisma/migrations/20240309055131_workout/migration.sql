/*
  Warnings:

  - The primary key for the `Workout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `feedback` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_pkey",
DROP COLUMN "date",
DROP COLUMN "feedback",
DROP COLUMN "userId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Workout_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Workout_id_seq";
