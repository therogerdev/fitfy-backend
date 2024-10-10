/*
  Warnings:

  - You are about to drop the `Program` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_boxId_fkey";

-- DropTable
DROP TABLE "Program";

-- CreateTable
CREATE TABLE "Programs" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "numWeeks" INTEGER NOT NULL,
    "numClassesPerWeek" INTEGER NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "isDraft" BOOLEAN NOT NULL,
    "durationMax" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "hasSchedule" BOOLEAN NOT NULL DEFAULT false,
    "totalClasses" INTEGER NOT NULL,
    "classesId" TEXT,
    "boxId" TEXT,

    CONSTRAINT "Programs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Programs_slug_key" ON "Programs"("slug");

-- AddForeignKey
ALTER TABLE "Programs" ADD CONSTRAINT "Programs_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "Classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programs" ADD CONSTRAINT "Programs_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE SET NULL ON UPDATE CASCADE;
