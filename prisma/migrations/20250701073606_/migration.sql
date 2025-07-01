-- CreateTable
CREATE TABLE "Setting" (
    "id" UUID NOT NULL,
    "defaultInitialPoint" INTEGER NOT NULL DEFAULT 25000,
    "defaultReturnPoint" INTEGER NOT NULL DEFAULT 30000,
    "defaultBonusPoint" TEXT NOT NULL DEFAULT '10-30',
    "defaultScoreRate" INTEGER NOT NULL DEFAULT 50,
    "defaultChipRate" INTEGER NOT NULL DEFAULT 200,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
