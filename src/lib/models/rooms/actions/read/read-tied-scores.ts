"use server";

import { db } from "../../../db";

export interface TiedScore {
  userId: string;
  userName: string;
  userIcon: string;
  score: number;
  currentOrder: number;
}

export const readTiedScores = async (
  roomId: string,
  gameCount: number
): Promise<TiedScore[]> => {
  const scores = await db
    .selectFrom("Score")
    .innerJoin("RoomUser", (join) =>
      join
        .onRef("Score.userId", "=", "RoomUser.userId")
        .onRef("Score.roomId", "=", "RoomUser.roomId")
    )
    .innerJoin("User", "User.id", "RoomUser.userId")
    .select([
      "Score.userId",
      "User.name as userName",
      "User.icon as userIcon",
      "Score.score",
      "Score.order as currentOrder",
    ])
    .where("Score.roomId", "=", roomId)
    .where("Score.gameCount", "=", gameCount)
    .orderBy("Score.score", "desc")
    .orderBy("Score.order", "asc")
    .execute();

  return scores;
};
