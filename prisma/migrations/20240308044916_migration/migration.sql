/*
  Warnings:

  - Added the required column `date` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intensity` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "intensity" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;
