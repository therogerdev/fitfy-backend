-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_coachId_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "startTime" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "coachId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Athlete"("id") ON DELETE SET NULL ON UPDATE CASCADE;
