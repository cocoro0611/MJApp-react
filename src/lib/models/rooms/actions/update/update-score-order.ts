"use server";

import { db } from "../../../db";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";
import { updateScoreResults } from "./update-score-results";

export const updateScoreOrder = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const gameCount = Number(data.get("gameCount"));

  const room = await db
    .selectFrom("Room")
    .selectAll()
    .where("id", "=", roomId)
    .executeTakeFirst();

  if (!room) {
    throw new Error("Room not found");
  }

  await db.transaction().execute(async (trx) => {
    // フォームデータから順位情報を取得
    const formEntries = Array.from(data.entries());
    const orderEntries = formEntries.filter(([key]) =>
      key.startsWith("order-")
    );

    for (const [key, value] of orderEntries) {
      const userId = key.replace("order-", "");
      const order = Number(value);

      await trx
        .updateTable("Score")
        .set({ order })
        .where("roomId", "=", roomId)
        .where("userId", "=", userId)
        .where("gameCount", "=", gameCount)
        .execute();
    }

    // scoreResultを計算して更新
    await updateScoreResults(
      trx,
      roomId,
      room.initialPoint,
      room.returnPoint,
      room.bonusPoint,
      { gameCount }
    );
  });

  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
