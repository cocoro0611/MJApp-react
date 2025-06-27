"use server";

import type { Transaction } from "kysely";
import type { DB } from "../../../../types";
import { calculateBonusPoints } from "@/src/utils/score-result";

interface UpdateScoreResultOptions {
  gameCount?: number;
  skipDefaults?: boolean;
}

export const updateScoreResults = async (
  trx: Transaction<DB>,
  roomId: string,
  initialPoint: number,
  returnPoint: number,
  bonusPoint: string,
  options?: UpdateScoreResultOptions
) => {
  // updatedScoresの取得
  let query = trx
    .selectFrom("Score")
    .select(["userId", "gameCount", "score", "order"])
    .where("roomId", "=", roomId);

  // gameCountが指定されている場合（updateScoreの場合）
  if (options?.gameCount !== undefined) {
    query = query.where("gameCount", "=", options.gameCount);
  }

  // 初期値のscoreResultは更新しない場合（updateRoomの場合）
  if (options?.skipDefaults) {
    query = query.whereRef("createdAt", "!=", "updatedAt");
  }

  const updatedScores = await query.execute();

  const bonusPoints = calculateBonusPoints(
    initialPoint,
    returnPoint,
    bonusPoint
  );

  for (const scoreData of updatedScores) {
    const rawScore = (scoreData.score - returnPoint) / 1000;
    const bonus = bonusPoints[scoreData.order - 1] || 0; // order 1 → index 0
    const scoreResult = rawScore + bonus;

    await trx
      .updateTable("Score")
      .set({ scoreResult })
      .where("roomId", "=", roomId)
      .where("userId", "=", scoreData.userId)
      .where("gameCount", "=", scoreData.gameCount)
      .execute();
  }
};
