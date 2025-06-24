/*
  Warnings:

  - You are about to alter the column `scoreResult` on the `Score` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,1)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "scoreResult" SET DATA TYPE DOUBLE PRECISION;
