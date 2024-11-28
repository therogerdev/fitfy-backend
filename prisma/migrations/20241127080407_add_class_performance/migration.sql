-- AlterTable
ALTER TABLE "Performance" ADD COLUMN     "classId" TEXT;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
