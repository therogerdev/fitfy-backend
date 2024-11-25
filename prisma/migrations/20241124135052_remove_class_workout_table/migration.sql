/*
  Warnings:

  - You are about to drop the `ClassWorkout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassWorkout" DROP CONSTRAINT "ClassWorkout_classId_fkey";

-- DropForeignKey
ALTER TABLE "ClassWorkout" DROP CONSTRAINT "ClassWorkout_workoutId_fkey";

-- DropTable
DROP TABLE "ClassWorkout";
