/*
  Warnings:

  - The primary key for the `Program` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_boxId_fkey";

-- AlterTable
ALTER TABLE "Program" DROP CONSTRAINT "Program_pkey",
ALTER COLUMN "boxId" DROP NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Program_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Program_id_seq";

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE SET NULL ON UPDATE CASCADE;
