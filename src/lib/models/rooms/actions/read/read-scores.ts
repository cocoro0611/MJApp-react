"use server";

import { db } from "../../../db";
import type { ReadScoreData } from "../../type";
import { calculateBonusPoints } from "@/src/utils/score-result";

export const readScores = async (roomId: string): Promise<ReadScoreData[]> => {
  const room = await db
    .selectFrom("Room")
    .select(["initialPoint", "returnPoint", "bonusPoint"])
    .where("id", "=", roomId)
    .executeTakeFirst();

  if (!room) {
    throw new Error("Room not found");
  }

  const scoresData: ReadScoreData[] = [];

  const gameCounts = await db
    .selectFrom("Score")
    .select("gameCount")
    .where("roomId", "=", roomId)
    .groupBy("gameCount")
    .orderBy("gameCount", "asc")
    .execute();

  for (const game of gameCounts) {
    const gameScores = await db
      .selectFrom("Score")
      .innerJoin("RoomUser", (join) =>
        join
          .onRef("Score.userId", "=", "RoomUser.userId")
          .onRef("Score.roomId", "=", "RoomUser.roomId")
      )
      .select(["RoomUser.position", "Score.score", "Score.order"])
      .where("Score.roomId", "=", roomId)
      .where("Score.gameCount", "=", game.gameCount)
      .orderBy("RoomUser.position", "asc")
      .execute();

    // ボーナスポイントを計算
    const bonusPoints = calculateBonusPoints(
      room.initialPoint,
      room.returnPoint,
      room.bonusPoint
    );

    const scoresWithResult = gameScores.map((scoreData) => {
      // order は 1-4 なので、配列のインデックス用に -1
      const bonusIndex = scoreData.order - 1;
      const bonus = bonusPoints[bonusIndex] || 0;

      const totalScore = gameScores.reduce(
        (sum, scoreData) => sum + scoreData.score,
        0
      );

      return {
        position: scoreData.position,
        score: scoreData.score,
        scoreResult:
          totalScore === 0
            ? 0
            : (scoreData.score - room.returnPoint) / 1000 + bonus,
      };
    });

    scoresData.push({
      gameCount: game.gameCount,
      scores: scoresWithResult,
    });
  }

  return scoresData;
};
