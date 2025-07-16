/*
  Warnings:

  - Added the required column `cognitoUserId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cognitoUserId` to the `Setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cognitoUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "cognitoUserId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "cognitoUserId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cognitoUserId" UUID NOT NULL;
