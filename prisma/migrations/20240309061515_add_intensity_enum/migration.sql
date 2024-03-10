/*
  Warnings:

  - Changed the type of `intensity` on the `Workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Intensity" AS ENUM ('Low', 'Medium', 'High');

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "intensity",
ADD COLUMN     "intensity" "Intensity" NOT NULL;
