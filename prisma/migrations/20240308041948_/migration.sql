/*
  Warnings:

  - The primary key for the `Athlete` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Athlete_id_seq";
