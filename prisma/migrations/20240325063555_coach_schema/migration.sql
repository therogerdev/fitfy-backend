/*
  Warnings:

  - You are about to drop the column `sex` on the `Coach` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Coach` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coach" DROP COLUMN "sex",
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "profileImageUrl" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "descriptionMarkdown" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL,
ALTER COLUMN "headerImage" DROP NOT NULL,
ALTER COLUMN "bioVideo" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "published" DROP NOT NULL,
ALTER COLUMN "classCount" DROP NOT NULL;
