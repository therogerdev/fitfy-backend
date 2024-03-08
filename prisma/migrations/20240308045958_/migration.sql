/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Athlete` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Athlete_email_key" ON "Athlete"("email");
