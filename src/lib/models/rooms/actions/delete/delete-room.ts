"use server";

import { db } from "../../../db";

export const deleteRoom = async (data: FormData) => {
  try {
    const roomId = data.get("id") as string;

    await db.transaction().execute(async (trx) => {
      await trx.deleteFrom("Score").where("roomId", "=", roomId).execute();
      await trx.deleteFrom("Chip").where("roomId", "=", roomId).execute();
      await trx.deleteFrom("RoomUser").where("roomId", "=", roomId).execute();
      await trx.deleteFrom("Room").where("id", "=", roomId).execute();
    });

    return {
      success: true,
      message: "ルームが削除されました",
      redirect: "/rooms",
    };
  } catch (_error) {
    return {
      success: false,
      message: "ルームの削除に失敗しました",
      redirect: "/rooms",
    };
  }
};
