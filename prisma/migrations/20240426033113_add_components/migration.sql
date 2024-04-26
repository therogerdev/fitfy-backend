-- CreateTable
CREATE TABLE "Components" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "video" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "classesId" TEXT,

    CONSTRAINT "Components_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Components" ADD CONSTRAINT "Components_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "Classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
