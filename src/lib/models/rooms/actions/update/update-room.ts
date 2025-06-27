"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { db } from "../../../db";
import type { UpdateRoom } from "../../type";
import { updateScoreResults } from "./utils/update-score-results";

export const updateRoom = async (data: FormData) => {
  const roomId = String(data.get("roomId"));

  try {
    const room: UpdateRoom = {
      name: String(data.get("name")),
      initialPoint: Number(data.get("initialPoint")),
      returnPoint: Number(data.get("returnPoint")),
      bonusPoint: String(data.get("bonusPoint")),
      scoreRate: Number(data.get("scoreRate")),
      chipRate: Number(data.get("chipRate")),
      gameAmount: Number(data.get("gameAmount")),
      updatedAt: new Date(),
    };

    await db.transaction().execute(async (trx) => {
      // 1. Roomを更新
      await trx
        .updateTable("Room")
        .set(room)
        .where("id", "=", roomId)
        .execute();

      // 2. scoreResultを計算して更新
      await updateScoreResults(
        trx,
        roomId,
        room.initialPoint,
        room.returnPoint,
        room.bonusPoint,
        { skipDefaults: true }
      );
    });

    await revalidateAll();
    return {
      success: true,
      message: "ルームが更新されました",
      redirect: `/rooms/${roomId}`,
    };
  } catch (_error) {
    return {
      success: false,
      message: "ルームの更新に失敗しました",
      redirect: `/rooms/${roomId}`,
    };
  }
};
