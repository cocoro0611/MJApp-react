"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { v4 } from "uuid";
import { db } from "../../../db";
import type { CreateDefaultRoom, UpdateDefaultRoom } from "../../type";

export const upsertDefaultRoom = async (data: FormData) => {
  try {
    const existingSetting = await db
      .selectFrom("Setting")
      .select("id")
      .executeTakeFirst();

    if (existingSetting) {
      // 更新処理
      const setting: UpdateDefaultRoom = {
        defaultInitialPoint: Number(data.get("initialPoint")),
        defaultReturnPoint: Number(data.get("returnPoint")),
        defaultBonusPoint: String(data.get("bonusPoint")),
        defaultScoreRate: Number(data.get("scoreRate")),
        defaultChipRate: Number(data.get("chipRate")),
        updatedAt: new Date(),
      };
      await db
        .updateTable("Setting")
        .set(setting)
        .where("id", "=", existingSetting?.id)
        .execute();
    } else {
      // 作成処理
      const setting: CreateDefaultRoom = {
        id: v4(),
        defaultInitialPoint: Number(data.get("initialPoint")),
        defaultReturnPoint: Number(data.get("returnPoint")),
        defaultBonusPoint: String(data.get("bonusPoint")),
        defaultScoreRate: Number(data.get("scoreRate")),
        defaultChipRate: Number(data.get("chipRate")),
      };
      await db.insertInto("Setting").values(setting).execute();
    }

    await revalidateAll();

    return {
      success: true,
      message: "ルームのデフォルト設定が保存されました",
      redirect: "/setting/room-setting",
    };
  } catch (_error) {
    return {
      success: false,
      message: "ルームのデフォルト設定の保存に失敗しました",
      redirect: "/setting/room-setting",
    };
  }
};
