-- AlterTable
ALTER TABLE "Setting" ALTER COLUMN "defaultInitialPoint" DROP NOT NULL,
ALTER COLUMN "defaultReturnPoint" DROP NOT NULL,
ALTER COLUMN "defaultBonusPoint" DROP NOT NULL,
ALTER COLUMN "defaultScoreRate" DROP NOT NULL,
ALTER COLUMN "defaultChipRate" DROP NOT NULL;
