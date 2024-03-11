/*
  Warnings:

  - You are about to drop the column `isArchived` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `boxId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `currentAthletes` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `maxAthletes` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `recurrence` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `intensity` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `publishAt` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `_CoachSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SessionParticipants` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `programId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_boxId_fkey";

-- DropForeignKey
ALTER TABLE "_CoachSession" DROP CONSTRAINT "_CoachSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoachSession" DROP CONSTRAINT "_CoachSession_B_fkey";

-- DropForeignKey
ALTER TABLE "_SessionParticipants" DROP CONSTRAINT "_SessionParticipants_A_fkey";

-- DropForeignKey
ALTER TABLE "_SessionParticipants" DROP CONSTRAINT "_SessionParticipants_B_fkey";

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "isArchived";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "boxId",
DROP COLUMN "currentAthletes",
DROP COLUMN "description",
DROP COLUMN "duration",
DROP COLUMN "maxAthletes",
DROP COLUMN "recurrence",
DROP COLUMN "title",
ADD COLUMN     "programId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "intensity",
DROP COLUMN "isPublished",
DROP COLUMN "publishAt",
DROP COLUMN "type";

-- DropTable
DROP TABLE "_CoachSession";

-- DropTable
DROP TABLE "_SessionParticipants";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
