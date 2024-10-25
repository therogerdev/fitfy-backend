-- CreateEnum
CREATE TYPE "ClassEnrollmentStatus" AS ENUM ('Enrolled', 'Canceled', 'Waitlisted');

-- AlterTable
ALTER TABLE "ClassEnrollment" ADD COLUMN     "status" "ClassEnrollmentStatus" NOT NULL DEFAULT 'Enrolled';
