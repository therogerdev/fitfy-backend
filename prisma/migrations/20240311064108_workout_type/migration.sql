/*
  Warnings:

  - Added the required column `type` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('ForTime', 'AMRAP', 'EMOM', 'RFT', 'Tabata', 'Chipper', 'Ladder', 'Strength', 'Skill');

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "type" "WorkoutType" NOT NULL;
