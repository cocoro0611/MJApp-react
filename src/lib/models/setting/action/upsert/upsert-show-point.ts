"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { v4 } from "uuid";
import { db } from "../../../db";
import type { CreateShowPoint, UpdateShowPoint } from "../../type";

export const upsertShowPoint = async (data: FormData) => {
  try {
    const existingSetting = await db
      .selectFrom("Setting")
      .select("id")
      .executeTakeFirst();

    // checkboxがチェックされていれば"on"、チェックされていなければundefined
    // !!で明示的にbooleanに変換
    const isShowPoint = !!data.get("isShowPoint");

    if (existingSetting) {
      // 更新処理
      const point: UpdateShowPoint = {
        isShowPoint: isShowPoint,
        updatedAt: new Date(),
      };
      await db
        .updateTable("Setting")
        .set(point)
        .where("id", "=", existingSetting?.id)
        .execute();
    } else {
      // 作成処理
      const point: CreateShowPoint = {
        id: v4(),
        isShowPoint: isShowPoint,
      };
      await db.insertInto("Setting").values(point).execute();
    }

    await revalidateAll();
    return {
      success: true,
      message: "ポイントの表示設定が保存されました",
      redirect: "/setting/show-point-setting",
    };
  } catch (_error) {
    return {
      success: false,
      message: "ポイントの表示設定の保存に失敗しました",
      redirect: "/setting/show-point-setting",
    };
  }
};
