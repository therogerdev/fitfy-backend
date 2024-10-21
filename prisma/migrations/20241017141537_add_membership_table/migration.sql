/*
  Warnings:

  - You are about to drop the column `date` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Classes` table. All the data in the column will be lost.
  - Added the required column `name` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `Classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Athlete" ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Classes" DROP COLUMN "date",
DROP COLUMN "startTime",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "schedule" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "athleteId" TEXT;

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "athleteId" TEXT NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "analysis" JSONB NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "User" ADD CONSTRAINT "User_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AthleteClasses" ADD CONSTRAINT "_AthleteClasses_A_fkey" FOREIGN KEY ("A") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AthleteClasses" ADD CONSTRAINT "_AthleteClasses_B_fkey" FOREIGN KEY ("B") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
