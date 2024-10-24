/*
  Warnings:

  - The values [MUAYTHAY] on the enum `ClassType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ClassType_new" AS ENUM ('CROSSFIT', 'YOGA', 'HIIT', 'WEIGHTLIFTING', 'MUAYTHAI');
ALTER TABLE "Class" ALTER COLUMN "classType" TYPE "ClassType_new" USING ("classType"::text::"ClassType_new");
ALTER TYPE "ClassType" RENAME TO "ClassType_old";
ALTER TYPE "ClassType_new" RENAME TO "ClassType";
DROP TYPE "ClassType_old";
COMMIT;
