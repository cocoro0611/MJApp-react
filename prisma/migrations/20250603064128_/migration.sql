/*
  Warnings:

  - You are about to drop the column `input` on the `Chip` table. All the data in the column will be lost.
  - You are about to drop the column `input` on the `Score` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chip" DROP COLUMN "input";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "input";
