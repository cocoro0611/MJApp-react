"use server";

import { db } from "../../../db";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";

export const deleteChip = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const gameCount = Number(data.get("gameCount"));

  await db.transaction().execute(async (trx) => {
    // 1. 指定されたgameCountのチップを削除
    await trx
      .deleteFrom("Chip")
      .where("roomId", "=", roomId)
      .where("gameCount", "=", gameCount)
      .execute();

    // 2. 削除されたgameCountより大きいものを取得
    const chipsToUpdate = await trx
      .selectFrom("Chip")
      .select(["userId", "gameCount"])
      .where("roomId", "=", roomId)
      .where("gameCount", ">", gameCount)
      .orderBy("gameCount", "asc")
      .execute();

    // 3. gameCountを1つずつ減らして更新
    for (const chip of chipsToUpdate) {
      await trx
        .updateTable("Chip")
        .set({ gameCount: chip.gameCount - 1 })
        .where("roomId", "=", roomId)
        .where("userId", "=", chip.userId)
        .where("gameCount", "=", chip.gameCount)
        .execute();
    }
  });

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
