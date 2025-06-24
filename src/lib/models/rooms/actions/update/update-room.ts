"use server";

import { db } from "../../../db";
import type { UpdateRoom } from "../../type";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";
import { updateScoreResults } from "./update-score-results";

export const updateRoom = async (data: FormData) => {
  const roomId = String(data.get("roomId"));

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
    await trx.updateTable("Room").set(room).where("id", "=", roomId).execute();

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

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
