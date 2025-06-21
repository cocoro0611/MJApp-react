"use server";

import { db } from "../../../db";
import type { ReadScore } from "../../type";

export const readScores = async (roomId: string): Promise<ReadScore[]> => {
  const allScores = await db
    .selectFrom("Score")
    .innerJoin("RoomUser", (join) =>
      join
        .onRef("Score.userId", "=", "RoomUser.userId")
        .onRef("Score.roomId", "=", "RoomUser.roomId"),
    )
    .select(["Score.gameCount", "Score.score", "Score.scoreResult"])
    .where("Score.roomId", "=", roomId)
    .orderBy("Score.gameCount", "asc")
    .orderBy("RoomUser.position", "asc")
    .execute();

  const scores: ReadScore[] = [];

  for (const scoreData of allScores) {
    // そのゲーム回数が既にあるか探す
    let gameScore = scores.find((s) => s.gameCount === scoreData.gameCount);

    // なければ新しく作る
    if (!gameScore) {
      gameScore = {
        gameCount: scoreData.gameCount,
        scores: [],
      };
      scores.push(gameScore);
    }

    // スコアを追加
    gameScore.scores.push({
      score: scoreData.score,
      scoreResult: scoreData.scoreResult,
    });
  }

  return scores;
};
