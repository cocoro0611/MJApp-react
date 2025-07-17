"use server";

import { revalidateAll } from "../../../../revalidate-wrapper";
import { db } from "../../../../db";

export const upsertDefaultUsers = async (data: FormData) => {
  const isNewRoom = data.get("isNewRoom") === "true"; // /rooms/new から呼び出しているか
  const redirectUrl = isNewRoom ? "/rooms/new" : "/setting/room-setting"; // リダイレクト先

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

    await revalidateAll();

    return {
      success: true,
      message: "ユーザーが選択されました",
      redirect: redirectUrl,
    };
  } catch (_error) {
    return {
      success: false,
      message: "ユーザーの選択に失敗しました",
      redirect: redirectUrl,
    };
  }
};
