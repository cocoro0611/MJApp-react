"use server";

import { db } from "../../../db";

export const deleteAmount = async (data: FormData) => {
  const roomId = String(data.get("roomId"));

  try {
    await db.transaction().execute(async (trx) => {
      await trx
        .updateTable("Room")
        .set({ gameAmount: 0 })
        .where("id", "=", roomId)
        .execute();
    });

    return {
      success: true,
      message: "場代が削除されました",
      redirect: `/rooms/${roomId}`,
    };
  } catch (_error) {
    return {
      success: false,
      message: "場代の削除に失敗しました",
      redirect: `/rooms/${roomId}`,
    };
  }
};
