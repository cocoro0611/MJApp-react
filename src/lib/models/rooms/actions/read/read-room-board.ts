"use server";

import { db } from "../../../db";
import type { ReadRoomBoardData } from "../../type";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

export const readRoomBoard = async (
  roomId: string
): Promise<ReadRoomBoardData | null> => {
  const room = await db
    .selectFrom("Room")
    .select(["id", "name", "scoreRate", "chipRate", "gameAmount"])
    .where("id", "=", roomId)
    .executeTakeFirst();

  if (!room) {
    return null;
  }

  const roomUsersNotScore = await db
    .selectFrom("RoomUser")
    .innerJoin("User", "User.id", "RoomUser.userId")
    .select(["User.id", "User.name", "User.icon"])
    .where("roomId", "=", roomId)
    .orderBy("RoomUser.position", "asc")
    .execute();

  const roomUsers = await Promise.all(
    roomUsersNotScore.map(async (user) => {
      const scoreSum = await db
        .selectFrom("Score")
        .select((eb) => eb.fn.sum("score").as("total"))
        .where("userId", "=", user.id)
        .where("roomId", "=", roomId)
        .executeTakeFirst();

      const chipSum = await db
        .selectFrom("Chip")
        .select((eb) => [
          eb.fn.sum("chip").as("total"),
          eb.fn.max("gameCount").as("maxGameCount"),
        ])
        .where("userId", "=", user.id)
        .where("roomId", "=", roomId)
        .executeTakeFirst();

      const totalScore = Number(scoreSum?.total || 0);
      const totalChip = Number(chipSum?.total || 0);

      // 収支計算
      const INITIAL_CHIPS = 20 * Number(chipSum?.maxGameCount);
      const scorePoint = totalScore * room.scoreRate;
      const chipPoint = (totalChip - INITIAL_CHIPS) * room.chipRate;
      const gamePoint = room.gameAmount / MAX_ROOM_PLAYERS;
      const totalPoint = scorePoint + chipPoint + gamePoint;

      return {
        id: user.id,
        name: user.name,
        icon: user.icon,
        totalScore: totalScore,
        totalChip: totalChip,
        totalPoint: totalPoint,
      };
    })
  );

  return {
    ...room,
    users: roomUsers,
  };
};
