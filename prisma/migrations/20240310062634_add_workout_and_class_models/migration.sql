-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "coachId" TEXT NOT NULL,
    "boxId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "maxAthletes" INTEGER NOT NULL,
    "currentAthletes" INTEGER NOT NULL DEFAULT 0,
    "warmupDescription" TEXT,
    "skillDescription" TEXT,
    "cooldownDescription" TEXT,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassToAthlete" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToAthlete_AB_unique" ON "_ClassToAthlete"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToAthlete_B_index" ON "_ClassToAthlete"("B");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToAthlete" ADD CONSTRAINT "_ClassToAthlete_A_fkey" FOREIGN KEY ("A") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToAthlete" ADD CONSTRAINT "_ClassToAthlete_B_fkey" FOREIGN KEY ("B") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
