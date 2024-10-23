/*
  Warnings:

  - Added the required column `classType` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coachId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('CROSSFIT', 'YOGA', 'HIIT', 'WEIGHTLIFTING');

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "classType" "ClassType" NOT NULL,
ADD COLUMN     "coachId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_AthleteClasses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AthleteClasses_AB_unique" ON "_AthleteClasses"("A", "B");

-- CreateIndex
CREATE INDEX "_AthleteClasses_B_index" ON "_AthleteClasses"("B");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AthleteClasses" ADD CONSTRAINT "_AthleteClasses_A_fkey" FOREIGN KEY ("A") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AthleteClasses" ADD CONSTRAINT "_AthleteClasses_B_fkey" FOREIGN KEY ("B") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
