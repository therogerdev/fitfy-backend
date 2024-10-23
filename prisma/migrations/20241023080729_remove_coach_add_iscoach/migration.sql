/*
  Warnings:

  - You are about to drop the column `coachId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `Coach` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_coachId_fkey";

-- AlterTable
ALTER TABLE "Athlete" ADD COLUMN     "isCoach" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "coachId";

-- DropTable
DROP TABLE "Coach";

-- DropEnum
DROP TYPE "CoachSpeciality";
