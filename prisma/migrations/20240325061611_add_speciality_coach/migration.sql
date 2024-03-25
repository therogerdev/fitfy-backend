-- CreateEnum
CREATE TYPE "CoachSpeciality" AS ENUM ('CrossFit', 'Strength', 'Endurance', 'Gymnastics', 'Weightlifting');

-- AlterTable
ALTER TABLE "Coach" ADD COLUMN     "speciality" "CoachSpeciality";
