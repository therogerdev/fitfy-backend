/*
  Warnings:

  - You are about to drop the column `boxId` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `isCoach` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `isOwner` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `profileImageUrl` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Box` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Box` table. All the data in the column will be lost.
  - The primary key for the `Program` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Program` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Athlete` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstname` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `lastName` on the `Athlete` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `email` on the `Athlete` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `name` on table `Box` required. This step will fail if there are existing NULL values in that column.
  - Made the column `street` on table `Box` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Box` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Box` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postalCode` on table `Box` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Box` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Box` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `boxId` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Program` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_boxId_fkey";

-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_programId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_programId_fkey";

-- DropIndex
DROP INDEX "Athlete_email_key";

-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "boxId",
DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "isCoach",
DROP COLUMN "isOwner",
DROP COLUMN "profileImageUrl",
ADD COLUMN     "classesId" INTEGER,
ADD COLUMN     "firstname" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "lastName",
ADD COLUMN     "lastName" INTEGER NOT NULL,
DROP COLUMN "email",
ADD COLUMN     "email" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Box" DROP COLUMN "createdAt",
DROP COLUMN "phone",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "postalCode" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Program" DROP CONSTRAINT "Program_pkey",
ADD COLUMN     "boxId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "description" SET NOT NULL,
ADD CONSTRAINT "Program_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Workout";

-- DropEnum
DROP TYPE "Intensity";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "avatarImage" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionMarkdown" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "headerImage" TEXT NOT NULL,
    "bioVideo" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "classCount" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "classesId" INTEGER,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classes" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "workout" INTEGER NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workouts" (
    "id" TEXT NOT NULL,
    "type" "WorkoutType",
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "intensity" TEXT NOT NULL,
    "movements" TEXT NOT NULL,
    "coachId" TEXT,

    CONSTRAINT "Workouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_userId_key" ON "Coach"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Classes_workout_key" ON "Classes"("workout");

-- CreateIndex
CREATE UNIQUE INDEX "Athlete_userId_key" ON "Athlete"("userId");

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "Classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "Classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;
