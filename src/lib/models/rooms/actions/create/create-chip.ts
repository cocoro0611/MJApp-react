"use server";

import { db } from "../../../db";
import type { ChipData } from "../../type";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";

type ChipCreateData = Omit<ChipData, "createdAt" | "updatedAt">;

export const createChip = async (data: FormData) => {
  const roomId = String(data.get("roomId"));

  // ルームのユーザー一覧を取得
  const roomUsers = await db
    .selectFrom("RoomUser")
    .select("userId")
    .where("roomId", "=", roomId)
    .execute();

  // 最大gameCountを取得
  const maxGameCount = await db
    .selectFrom("Chip")
    .select((eb) => eb.fn.max("gameCount").as("maxGameCount"))
    .where("roomId", "=", roomId)
    .executeTakeFirst();

  const chipData: ChipCreateData[] = roomUsers.map((user) => ({
    chip: 0,
    gameCount: (maxGameCount?.maxGameCount ?? 0) + 1,
    roomId: roomId,
    userId: user.userId,
  }));

  await db.insertInto("Chip").values(chipData).execute();

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
