"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { v4 } from "uuid";
import { db } from "../../../db";
import type { CreateSetting } from "../../type";

export const createSetting = async (data: FormData) => {
  try {
    const setting: CreateSetting = {
      id: v4(),
      defaultInitialPoint: Number(data.get("initialPoint")),
      defaultReturnPoint: Number(data.get("returnPoint")),
      defaultBonusPoint: String(data.get("bonusPoint")),
      defaultScoreRate: Number(data.get("scoreRate")),
      defaultChipRate: Number(data.get("chipRate")),
    };
    await db.insertInto("Setting").values(setting).execute();
    await revalidateAll();

    return {
      success: true,
      message: "ルームのデフォルト設定が作成されました",
      redirect: "/setting",
    };
  } catch (_error) {
    return {
      success: false,
      message: "ルームのデフォルト設定の作成に失敗しました",
      redirect: "/setting",
    };
  }
};
