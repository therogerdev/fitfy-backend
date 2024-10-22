/*
  Warnings:

  - You are about to drop the column `classesId` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `analysis` on the `Performance` table. All the data in the column will be lost.
  - You are about to drop the `Classes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AthleteClasses` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[athleteId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceId` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Membership` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `result` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workout` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MembershipType" AS ENUM ('DAY', 'MONTH', 'UNIT_PACKAGE', 'TRIMESTER', 'SEMESTER');

-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_classesId_fkey";

-- DropForeignKey
ALTER TABLE "Coach" DROP CONSTRAINT "Coach_classesId_fkey";

-- DropForeignKey
ALTER TABLE "Components" DROP CONSTRAINT "Components_classesId_fkey";

-- DropForeignKey
ALTER TABLE "Programs" DROP CONSTRAINT "Programs_classesId_fkey";

-- DropForeignKey
ALTER TABLE "_AthleteClasses" DROP CONSTRAINT "_AthleteClasses_A_fkey";

-- DropForeignKey
ALTER TABLE "_AthleteClasses" DROP CONSTRAINT "_AthleteClasses_B_fkey";

-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "classesId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "priceId" TEXT NOT NULL,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "MembershipType" NOT NULL;

-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "analysis",
ADD COLUMN     "result" TEXT NOT NULL,
ADD COLUMN     "workout" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true;

-- DropTable
DROP TABLE "Classes";

-- DropTable
DROP TABLE "_AthleteClasses";

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AthleteClasses" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "checkInAt" TIMESTAMP(3),

    CONSTRAINT "AthleteClasses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_athleteId_key" ON "User"("athleteId");

-- AddForeignKey
ALTER TABLE "AthleteClasses" ADD CONSTRAINT "AthleteClasses_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteClasses" ADD CONSTRAINT "AthleteClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
