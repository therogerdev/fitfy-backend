-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_programsId_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "programsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_programsId_fkey" FOREIGN KEY ("programsId") REFERENCES "Programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
