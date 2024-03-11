-- AlterTable
ALTER TABLE "Movement" ADD COLUMN     "workoutId" TEXT;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
