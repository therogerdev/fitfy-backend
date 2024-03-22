/*
  Warnings:

  - The primary key for the `Classes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_classesId_fkey";

-- DropForeignKey
ALTER TABLE "Coach" DROP CONSTRAINT "Coach_classesId_fkey";

-- AlterTable
ALTER TABLE "Athlete" ALTER COLUMN "classesId" SET DATA TYPE TEXT,
ALTER COLUMN "firstname" SET DATA TYPE TEXT,
ALTER COLUMN "lastName" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Classes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Classes_id_seq";

-- AlterTable
ALTER TABLE "Coach" ALTER COLUMN "classesId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "Classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "Classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
