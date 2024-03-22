/*
  Warnings:

  - You are about to drop the `Workouts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workouts" DROP CONSTRAINT "Workouts_coachId_fkey";

-- DropTable
DROP TABLE "Workouts";

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "type" "WorkoutType",
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "intensity" TEXT NOT NULL,
    "movements" TEXT NOT NULL,
    "coachId" TEXT,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;
