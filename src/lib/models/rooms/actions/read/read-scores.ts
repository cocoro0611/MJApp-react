"use server";

import { db } from "../../../db";
import type { ReadScoreData } from "../../type";

export const readScores = async (roomId: string): Promise<ReadScoreData[]> => {
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
      .select(["RoomUser.position", "Score.score"])
      .where("Score.roomId", "=", roomId)
      .where("Score.gameCount", "=", game.gameCount)
      .orderBy("RoomUser.position", "asc")
      .execute();

    scoresData.push({
      gameCount: game.gameCount,
      scores: gameScores,
    });
  }

  return scoresData;
};
