/*
  Warnings:

  - You are about to drop the column `PrimaryColor` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `SecondaryColor` on the `Setting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "PrimaryColor",
DROP COLUMN "SecondaryColor",
ADD COLUMN     "primaryColor" TEXT,
ADD COLUMN     "secondaryColor" TEXT;
