/*
  Warnings:

  - Added the required column `updatedAt` to the `Programs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "programsId" TEXT;

-- AlterTable
ALTER TABLE "Programs" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_programsId_fkey" FOREIGN KEY ("programsId") REFERENCES "Programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
