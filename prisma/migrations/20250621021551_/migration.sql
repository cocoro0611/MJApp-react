/*
  Warnings:

  - Added the required column `scoreResult` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "scoreResult" INTEGER NOT NULL;
