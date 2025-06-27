"use server";

// MEMO: 削除されたデータを参照するページが再レンダリングされて500errorになるため
import { revalidateAll } from "../../../revalidate-wrapper";
import { db } from "../../../db";
import { redirect } from "next/navigation";

export const deleteRoom = async (data: FormData) => {
  const roomId = data.get("id") as string;

  const deleteRoom = await db.transaction().execute(async (trx) => {
    try {
      await trx.deleteFrom("Score").where("roomId", "=", roomId).execute();
      await trx.deleteFrom("Chip").where("roomId", "=", roomId).execute();
      await trx.deleteFrom("RoomUser").where("roomId", "=", roomId).execute();
      await trx.deleteFrom("Room").where("id", "=", roomId).execute();
      return true;
    } catch {
      return false;
    }
  });

  if (!deleteRoom) {
    await revalidateAll();
    redirect("/rooms?error=failed");
  }

  // 成功時
  await revalidateAll();
  redirect("/rooms?message=deleted");
};
