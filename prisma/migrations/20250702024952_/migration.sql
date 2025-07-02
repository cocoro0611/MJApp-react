/*
  Warnings:

  - You are about to drop the column `defaultColorTheme` on the `Setting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "defaultColorTheme",
ADD COLUMN     "PrimaryColor" TEXT,
ADD COLUMN     "SecondaryColor" TEXT;
