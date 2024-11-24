/*
  Warnings:

  - You are about to drop the column `reps` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Movement` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Movement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('CARDIO', 'STRENGTH', 'FLEXIBILITY', 'GYMNASTICS', 'OLYMPIC_LIFTING', 'ACCESSORY', 'CORE', 'BALANCE', 'ENDURANCE', 'POWER', 'BODYWEIGHT');

-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "reps",
DROP COLUMN "weight",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "MovementType" NOT NULL;
