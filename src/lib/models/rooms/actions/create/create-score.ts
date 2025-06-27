"use server";

import { db } from "../../../db";
import type { CreateScore } from "../../type";

export const createScore = async (data: FormData) => {
  const roomId = String(data.get("roomId"));

  try {
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

    const scores: CreateScore[] = roomUsers.map((user, index) => ({
      score: 0,
      gameCount: (maxGameCount?.maxGameCount ?? 0) + 1,
      order: index + 1,
      scoreResult: 0,
      roomId: roomId,
      userId: user.userId,
    }));

    await db.insertInto("Score").values(scores).execute();

    return {
      success: true,
      message: "スコアが作成されました",
      redirect: `/rooms/${roomId}`,
    };
  } catch (error) {
    return {
      success: false,
      message: "スコアの作成に失敗しました",
      redirect: `/rooms/${roomId}`,
    };
  }
};
