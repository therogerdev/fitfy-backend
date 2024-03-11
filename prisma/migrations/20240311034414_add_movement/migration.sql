-- CreateTable
CREATE TABLE "Movement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "weight" TEXT,
    "reps" TEXT[],

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);
