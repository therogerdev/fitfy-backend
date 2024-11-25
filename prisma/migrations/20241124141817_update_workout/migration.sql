-- AlterTable
ALTER TABLE "Movement" ADD COLUMN     "instructions" TEXT;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "originalWorkoutId" TEXT,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;
