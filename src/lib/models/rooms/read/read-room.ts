"use server";

import { db } from "../../db";
import type { ReadRoomDetailData } from "../type";

export const readRoom = async (
  roomId: string
): Promise<ReadRoomDetailData | null> => {
  const room = await db
    .selectFrom("Room")
    .select(["id", "name"])
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
        .select((eb) => eb.fn.sum("chip").as("total"))
        .where("userId", "=", user.id)
        .where("roomId", "=", roomId)
        .executeTakeFirst();

      // FIXME: 収支計算
      const pointSum = 10000;

      return {
        id: user.id,
        name: user.name,
        icon: user.icon,
        totalScore: Number(scoreSum?.total || 0),
        totalChip: Number(chipSum?.total || 0),
        totalPoint: Number(pointSum || 0),
      };
    })
  );

  return {
    ...room,
    users: roomUsers,
  };
};
