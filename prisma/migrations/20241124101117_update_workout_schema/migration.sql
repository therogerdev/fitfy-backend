/*
  Warnings:

  - The values [Tabata] on the enum `WorkoutType` will be removed. If these variants are still used in the database, this will fail.
  - The `intensity` column on the `Workout` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkoutIntensity" AS ENUM ('Low', 'Moderate', 'High');

-- AlterEnum
BEGIN;
CREATE TYPE "WorkoutType_new" AS ENUM ('ForTime', 'AMRAP', 'EMOM', 'RFT', 'Chipper', 'Ladder', 'Strength', 'Skill');
ALTER TABLE "Workout" ALTER COLUMN "type" TYPE "WorkoutType_new" USING ("type"::text::"WorkoutType_new");
ALTER TYPE "WorkoutType" RENAME TO "WorkoutType_old";
ALTER TYPE "WorkoutType_new" RENAME TO "WorkoutType";
DROP TYPE "WorkoutType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "intensity",
ADD COLUMN     "intensity" "WorkoutIntensity";

-- CreateTable
CREATE TABLE "ClassWorkout" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "ClassWorkout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassWorkout" ADD CONSTRAINT "ClassWorkout_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassWorkout" ADD CONSTRAINT "ClassWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
