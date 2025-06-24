"use server";

import { db } from "../../../db";
import type { ReadRoom } from "../../type";

// N+1問題はあるが一旦はよし
export const readRooms = async (): Promise<ReadRoom[]> => {
  const roomsUsers: ReadRoom[] = [];

  const rooms = await db
    .selectFrom("Room")
    .select(["id", "name"])
    .orderBy("updatedAt", "asc")
    .execute();

  for (const room of rooms) {
    const roomUsersNotScore = await db
      .selectFrom("RoomUser")
      .innerJoin("User", "User.id", "RoomUser.userId")
      .select(["User.id", "User.name", "User.icon"])
      .where("roomId", "=", room.id)
      .orderBy("RoomUser.position", "asc")
      .execute();

    const roomUsers = await Promise.all(
      roomUsersNotScore.map(async (user) => {
        const scoreSum = await db
          .selectFrom("Score")
          .select((eb) => eb.fn.sum("scoreResult").as("total"))
          .where("userId", "=", user.id)
          .where("roomId", "=", room.id)
          .executeTakeFirst();

        return {
          id: user.id,
          name: user.name,
          icon: user.icon,
          totalScore: Math.round(Number(scoreSum?.total || 0) * 10) / 10, // 小数第1位で丸める
        };
      })
    );

    roomsUsers.push({
      ...room,
      users: roomUsers,
    });
  }

  return roomsUsers;
};
