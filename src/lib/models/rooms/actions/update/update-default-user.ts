"use server";

import { db } from "../../../db";

export const updateDefaultUser = async (data: FormData) => {
  try {
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
    return {
      success: true,
      message: "ユーザーが選択されました",
      redirect: "/rooms/new",
    };
  } catch (error) {
    return {
      success: false,
      message: "ユーザーの選択に失敗しました",
      redirect: "/rooms/new",
    };
  }
};
