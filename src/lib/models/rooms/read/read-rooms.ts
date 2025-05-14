"use server";

import { db } from "../../db";
import type { ReadUsersData } from "../type";

export const readRooms = async (): Promise<ReadUsersData[]> => {
  const roomsUsers: ReadUsersData[] = [];

  const rooms = await db
    .selectFrom("Room")
    .select(["id", "name"])
    .orderBy("updatedAt", "asc")
    .execute();

  for (const room of rooms) {
    const users = await db
      .selectFrom("RoomUser")
      .innerJoin("User", "User.id", "RoomUser.userId")
      .leftJoin("Score", (join) =>
        join
          .onRef("Score.userId", "=", "RoomUser.userId")
          .onRef("Score.roomId", "=", "RoomUser.roomId")
      )
      .select(["User.id", "User.name", "User.icon"])
      .select((eb) => [
        eb.fn.coalesce(eb.fn.sum("Score.score"), eb.lit(0)).as("totalScore"),
      ])
      .where("roomId", "=", room.id)
      .orderBy("RoomUser.position", "asc")
      .execute();

    roomsUsers.push({
      ...room,
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        icon: user.icon,
        totalScore: Number(user.totalScore),
      })),
    });
  }

  return roomsUsers;
};
