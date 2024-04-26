/*
  Warnings:

  - You are about to drop the column `movementId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_movementId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "movementId";

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
