/*
  Warnings:

  - Made the column `programsId` on table `Class` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_programsId_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "programsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_programsId_fkey" FOREIGN KEY ("programsId") REFERENCES "Programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
