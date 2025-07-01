"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { db } from "../../../db";
import type { UpdateSetting } from "../../type";

export const updateSetting = async (data: FormData) => {
  try {
    const existingSetting = await db
      .selectFrom("Setting")
      .select("id")
      .executeTakeFirst();

    const setting: UpdateSetting = {
      defaultInitialPoint: Number(data.get("initialPoint")),
      defaultReturnPoint: Number(data.get("returnPoint")),
      defaultBonusPoint: String(data.get("bonusPoint")),
      defaultScoreRate: Number(data.get("scoreRate")),
      defaultChipRate: Number(data.get("chipRate")),
      updatedAt: new Date(),
    };

    if (existingSetting) {
      await db
        .updateTable("Setting")
        .set(setting)
        .where("id", "=", existingSetting?.id)
        .execute();
    }

    await revalidateAll();

    return {
      success: true,
      message: "ルームのデフォルト設定が更新されました",
      redirect: "/setting",
    };
  } catch (_error) {
    return {
      success: false,
      message: "ルームのデフォルト設定の更新に失敗しました",
      redirect: "/setting",
    };
  }
};
