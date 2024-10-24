/*
  Warnings:

  - You are about to drop the `AthleteClasses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AthleteClasses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AthleteClasses" DROP CONSTRAINT "AthleteClasses_athleteId_fkey";

-- DropForeignKey
ALTER TABLE "AthleteClasses" DROP CONSTRAINT "AthleteClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "_AthleteClasses" DROP CONSTRAINT "_AthleteClasses_A_fkey";

-- DropForeignKey
ALTER TABLE "_AthleteClasses" DROP CONSTRAINT "_AthleteClasses_B_fkey";

-- DropTable
DROP TABLE "AthleteClasses";

-- DropTable
DROP TABLE "_AthleteClasses";

-- CreateTable
CREATE TABLE "ClassEnrollment" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "checkInAt" TIMESTAMP(3),

    CONSTRAINT "ClassEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassEnrollment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassEnrollment_AB_unique" ON "_ClassEnrollment"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassEnrollment_B_index" ON "_ClassEnrollment"("B");

-- AddForeignKey
ALTER TABLE "ClassEnrollment" ADD CONSTRAINT "ClassEnrollment_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassEnrollment" ADD CONSTRAINT "ClassEnrollment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassEnrollment" ADD CONSTRAINT "_ClassEnrollment_A_fkey" FOREIGN KEY ("A") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassEnrollment" ADD CONSTRAINT "_ClassEnrollment_B_fkey" FOREIGN KEY ("B") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
