/*
  Warnings:

  - The primary key for the `Box` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_boxId_fkey";

-- AlterTable
ALTER TABLE "Athlete" ALTER COLUMN "profileImageUrl" DROP NOT NULL,
ALTER COLUMN "boxId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Box" DROP CONSTRAINT "Box_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "nickname" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "postalCode" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL,
ADD CONSTRAINT "Box_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Box_id_seq";

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE SET NULL ON UPDATE CASCADE;
