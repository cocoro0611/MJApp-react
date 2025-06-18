"use server";

import { db } from "../../../db";
import { redirect } from "next/navigation";

export const updateDefaultUser = async (data: FormData) => {
  const selectedUserIds = data.getAll("userIds").map((id) => String(id));

  await db.transaction().execute(async (trx) => {
    await trx.updateTable("User").set({ isDefaultUser: false }).execute();

    if (selectedUserIds.length > 0) {
      await trx
        .updateTable("User")
        .set({ isDefaultUser: true })
        .where("id", "in", selectedUserIds)
        .execute();
    }
  });

  // これは瞬時に反映してほしいので、Toastの設定はなし
  redirect("/rooms/new");
};
