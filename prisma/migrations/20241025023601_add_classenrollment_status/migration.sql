/*
  Warnings:

  - The values [Enrolled,Canceled,Waitlisted] on the enum `ClassEnrollmentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ClassEnrollmentStatus_new" AS ENUM ('ENROLLED', 'CANCELED', 'WAITLISTED');
ALTER TABLE "ClassEnrollment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ClassEnrollment" ALTER COLUMN "status" TYPE "ClassEnrollmentStatus_new" USING ("status"::text::"ClassEnrollmentStatus_new");
ALTER TYPE "ClassEnrollmentStatus" RENAME TO "ClassEnrollmentStatus_old";
ALTER TYPE "ClassEnrollmentStatus_new" RENAME TO "ClassEnrollmentStatus";
DROP TYPE "ClassEnrollmentStatus_old";
ALTER TABLE "ClassEnrollment" ALTER COLUMN "status" SET DEFAULT 'ENROLLED';
COMMIT;

-- AlterTable
ALTER TABLE "ClassEnrollment" ALTER COLUMN "status" SET DEFAULT 'ENROLLED';
