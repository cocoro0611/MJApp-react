"use server";

import { db } from "../db";
import type { RoomData, RoomUserData } from "./type";
// FIXME:ビルド画面のリード反映にはなぜかこのキャッシュのクリアが必要なので実装
import { unstable_noStore } from "next/cache";

type RoomListData = Pick<
  RoomData,
  "id" | "name" | "createdAt" | "updatedAt"
> & {
  users: Pick<RoomUserData, "position" | "userId">[];
};

export const readRooms = async (): Promise<RoomListData[]> => {
  unstable_noStore();

  const rooms = await db
    .selectFrom("Room")
    .select(["id", "name", "createdAt", "updatedAt"])
    .orderBy("createdAt", "asc")
    .execute();

  const roomsUsers: RoomListData[] = [];
  for (const room of rooms) {
    const users = await db
      .selectFrom("RoomUser")
      .select(["userId", "position"])
      .where("roomId", "=", room.id)
      .execute();

    roomsUsers.push({
      ...room,
      users: users.map((user) => ({
        userId: user.userId,
        position: user.position,
      })),
    });
  }

  return roomsUsers;
};
