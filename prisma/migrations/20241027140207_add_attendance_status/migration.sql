-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('ATTENDED', 'MISSED');

-- AlterTable
ALTER TABLE "ClassEnrollment" ADD COLUMN     "attendanceStatus" "AttendanceStatus";
