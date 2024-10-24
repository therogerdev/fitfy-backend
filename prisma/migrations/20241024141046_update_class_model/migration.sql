/*
  Warnings:

  - You are about to drop the `_ClassEnrollment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClassEnrollment" DROP CONSTRAINT "_ClassEnrollment_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassEnrollment" DROP CONSTRAINT "_ClassEnrollment_B_fkey";

-- DropTable
DROP TABLE "_ClassEnrollment";
