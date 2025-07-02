"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { v4 } from "uuid";
import { db } from "../../../db";
import type { CreateColor, UpdateColor } from "../../type";

export const upsertColor = async (data: FormData) => {
  try {
    const existingSetting = await db
      .selectFrom("Setting")
      .select("id")
      .executeTakeFirst();

    if (existingSetting) {
      // 更新処理
      const color: UpdateColor = {
        primaryColor: String(data.get("primaryColor")),
        secondaryColor: String(data.get("secondaryColor")),
        updatedAt: new Date(),
      };
      await db
        .updateTable("Setting")
        .set(color)
        .where("id", "=", existingSetting?.id)
        .execute();
    } else {
      // 作成処理
      const color: CreateColor = {
        id: v4(),
        primaryColor: String(data.get("primaryColor")),
        secondaryColor: String(data.get("secondaryColor")),
      };
      await db.insertInto("Setting").values(color).execute();
    }

    await revalidateAll();

    return {
      success: true,
      message: "ルームのテーマカラーが保存されました",
      redirect: "/setting",
    };
  } catch (_error) {
    return {
      success: false,
      message: "ルームのテーマカラーの保存に失敗しました",
      redirect: "/setting",
    };
  }
};
