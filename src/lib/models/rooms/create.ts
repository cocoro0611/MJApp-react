"use server";

import { v4 } from "uuid";
import { db } from "../db";
import type { RoomData, RoomUserData } from "./type";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";

type RoomCreateData = Omit<RoomData, "createdAt" | "updatedAt">;
type RoomUserCreateData = Omit<RoomUserData, "createdAt" | "updatedAt">;

export const createRoom = async (data: FormData) => {
  const roomData: RoomCreateData = {
    id: v4(),
    name: String(data.get("name")),
    initialPoint: Number(data.get("initialPoint")),
    returnPoint: Number(data.get("returnPoint")),
    bonusPoint: String(data.get("bonusPoint")),
    scoreRate: Number(data.get("scoreRate")),
    chipRate: Number(data.get("chipRate")),
    gameAmount: 0,
  };

  const userIds = data.getAll("userIds");
  const roomUsersData: RoomUserCreateData[] = userIds.map((userId, index) => ({
    id: v4(),
    position: index + 1,
    userId: String(userId),
    roomId: roomData.id,
  }));

  await db.transaction().execute(async (trx) => {
    await trx.insertInto("Room").values(roomData).execute();
    await trx.insertInto("RoomUser").values(roomUsersData).execute();
  });

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomData.id}`);
};
