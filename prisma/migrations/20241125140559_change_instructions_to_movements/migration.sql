/*
  Warnings:

  - You are about to drop the `WorkoutInstruction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkoutInstruction" DROP CONSTRAINT "WorkoutInstruction_movementId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutInstruction" DROP CONSTRAINT "WorkoutInstruction_workoutId_fkey";

-- DropTable
DROP TABLE "WorkoutInstruction";

-- CreateTable
CREATE TABLE "WorkoutMovements" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "movementId" TEXT NOT NULL,
    "reps" INTEGER,
    "sets" INTEGER,
    "weight" DOUBLE PRECISION,
    "weightUnit" TEXT,
    "movements" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutMovements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutMovements" ADD CONSTRAINT "WorkoutMovements_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutMovements" ADD CONSTRAINT "WorkoutMovements_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
