/*
  Warnings:

  - Added the required column `icon` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDefault` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
