"use server";

import { db } from "../../db";
import type { ReadRoomData } from "../type";

// N+1問題はあるが一旦はよし
export const readRooms = async (): Promise<ReadRoomData[]> => {
  const roomsUsers: ReadRoomData[] = [];

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
          .select((eb) => eb.fn.sum("score").as("total"))
          .where("userId", "=", user.id)
          .where("roomId", "=", room.id)
          .executeTakeFirst();

        return {
          id: user.id,
          name: user.name,
          icon: user.icon,
          totalScore: Number(scoreSum?.total || 0),
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
