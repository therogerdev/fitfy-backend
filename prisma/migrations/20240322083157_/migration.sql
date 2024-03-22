/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Box` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Box" ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Box_email_key" ON "Box"("email");
