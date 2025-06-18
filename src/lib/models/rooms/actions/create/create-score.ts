"use server";

import { db } from "../../../db";
import type { ScoreData } from "../../type";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";

type ScoreCreateData = Omit<ScoreData, "createdAt" | "updatedAt">;

export const createScore = async (data: FormData) => {
  const roomId = String(data.get("roomId"));

  // ルームのユーザー一覧を取得
  const roomUsers = await db
    .selectFrom("RoomUser")
    .select("userId")
    .where("roomId", "=", roomId)
    .execute();

  // 最大gameCountを取得
  const maxGameCount = await db
    .selectFrom("Score")
    .select((eb) => eb.fn.max("gameCount").as("maxGameCount"))
    .where("roomId", "=", roomId)
    .executeTakeFirst();

  const scoreData: ScoreCreateData[] = roomUsers.map((user) => ({
    score: 0,
    gameCount: (maxGameCount?.maxGameCount ?? 0) + 1,
    roomId: roomId,
    userId: user.userId,
  }));

  await db.insertInto("Score").values(scoreData).execute();

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
