"use server";

import { db } from "../../../db";
import type { CreateChip } from "../../type";

export const createChip = async (data: FormData) => {
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
      .selectFrom("Chip")
      .select((eb) => eb.fn.max("gameCount").as("maxGameCount"))
      .where("roomId", "=", roomId)
      .executeTakeFirst();

    const chips: CreateChip[] = roomUsers.map((user) => ({
      chip: 0,
      gameCount: (maxGameCount?.maxGameCount ?? 0) + 1,
      roomId: roomId,
      userId: user.userId,
    }));

    await db.insertInto("Chip").values(chips).execute();

    return {
      success: true,
      message: "チップが作成されました",
      redirect: `/rooms/${roomId}`,
    };
  } catch (_error) {
    return {
      success: false,
      message: "チップの作成に失敗しました",
      redirect: `/rooms/${roomId}`,
    };
  }
};
