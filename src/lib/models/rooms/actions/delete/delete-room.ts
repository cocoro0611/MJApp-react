"use server";

import { db } from "../../../db";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";

export const deleteRoom = async (data: FormData) => {
  const roomId = data.get("id") as string;

  await db.transaction().execute(async (trx) => {
    await trx.deleteFrom("Score").where("roomId", "=", roomId).execute();
    await trx.deleteFrom("Chip").where("roomId", "=", roomId).execute();
    await trx.deleteFrom("RoomUser").where("roomId", "=", roomId).execute();
    await trx.deleteFrom("Room").where("id", "=", roomId).execute();
  });

  // Toastの都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect("/rooms");
};
