"use server";

import { db } from "../../../db";
import { requireAuth } from "../../../utils/auth-cognito";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";
import { isUUID } from "@/src/utils/uuid-check";
import { notFound } from "next/navigation";
import type { ReadRoomDetail } from "../../type";

export const readRoomDetail = async (
  roomId: string
): Promise<ReadRoomDetail> => {
  const cognitoUserId = await requireAuth();

  if (!isUUID(roomId)) {
    notFound();
  }

  const room = await db
    .selectFrom("Room")
    .select([
      "id",
      "name",
      "initialPoint",
      "returnPoint",
      "bonusPoint",
      "scoreRate",
      "chipRate",
      "gameAmount",
    ])
    .where("cognitoUserId", "=", cognitoUserId)
    .where("id", "=", roomId)
    .executeTakeFirst();

  if (!room) {
    throw new Error("ルームが見つかりません");
  }

  const roomUsers = await db
    .selectFrom("RoomUser")
    .innerJoin("User", "User.id", "RoomUser.userId")
    .select(["User.id", "User.name", "User.icon"])
    .where("roomId", "=", roomId)
    .orderBy("RoomUser.position", "asc")
    .execute();

  const roomUsersScore = await Promise.all(
    roomUsers.map(async (user) => {
      const scoreSum = await db
        .selectFrom("Score")
        .select((eb) => [
          eb.fn.sum("scoreResult").as("total"),
          eb.fn.max("gameCount").as("maxGameCount"),
        ])
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

      const totalScore = Math.round(Number(scoreSum?.total || 0) * 10) / 10; // 小数第1位で丸める

      const INITIAL_CHIPS = 20 * Number(chipSum?.maxGameCount);
      const totalChip = Number(chipSum?.total) - INITIAL_CHIPS;

      // 収支計算
      const scorePoint = totalScore * room.scoreRate;
      const chipPoint = totalChip * room.chipRate;
      const gamePoint = room.gameAmount / MAX_ROOM_PLAYERS;
      const totalPoint = Math.round(scorePoint + chipPoint - gamePoint);

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
    users: roomUsersScore,
  };
};
