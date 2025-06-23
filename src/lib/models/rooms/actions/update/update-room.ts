"use server";

import { db } from "../../../db";
import type { UpdateRoom } from "../../type";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";
import { calculateBonusPoints } from "@/src/utils/score-result";

export const updateRoom = async (data: FormData) => {
  const roomId = String(data.get("roomId"));

  const room: UpdateRoom = {
    name: String(data.get("name")),
    initialPoint: Number(data.get("initialPoint")),
    returnPoint: Number(data.get("returnPoint")),
    bonusPoint: String(data.get("bonusPoint")),
    scoreRate: Number(data.get("scoreRate")),
    chipRate: Number(data.get("chipRate")),
    gameAmount: Number(data.get("gameAmount")),
    updatedAt: new Date(),
  };

  await db.transaction().execute(async (trx) => {
    // 1. Roomを更新
    await trx.updateTable("Room").set(room).where("id", "=", roomId).execute();

    // 2. ボーナスポイントを計算
    const bonusPoints = calculateBonusPoints(
      room.initialPoint,
      room.returnPoint,
      room.bonusPoint
    );

    // 3. roomの全スコアを取得
    const allScores = await trx
      .selectFrom("Score")
      .select(["userId", "gameCount", "score", "order"])
      .where("roomId", "=", roomId)
      .whereRef("createdAt", "!=", "updatedAt") // 初期値のscoreResultは更新しない
      .execute();

    // 4. 各スコアを更新
    for (const scoreData of allScores) {
      const rawScore = (scoreData.score - room.returnPoint) / 1000;
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
  });

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
