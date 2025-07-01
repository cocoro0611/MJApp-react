"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { v4 } from "uuid";
import { db } from "../../../db";
import { DEFAULT_GAME_RULES } from "@/src/constants/gameRules";
import type { CreateSetting, UpdateSetting } from "../../type";

interface SettingData {
  defaultInitialPoint?: number;
  defaultReturnPoint?: number;
  defaultBonusPoint?: string;
  defaultScoreRate?: number;
  defaultChipRate?: number;
}

export const createCustomSetting = async (data: FormData) => {
  try {
    // FormDataから部分的なデータを構築
    const settingData: SettingData = {};

    const initialPoint = data.get("initialPoint");
    if (initialPoint !== null) {
      settingData.defaultInitialPoint = Number(initialPoint);
    }

    const returnPoint = data.get("returnPoint");
    if (returnPoint !== null) {
      settingData.defaultReturnPoint = Number(returnPoint);
    }

    const bonusPoint = data.get("bonusPoint");
    if (bonusPoint !== null) {
      settingData.defaultBonusPoint = String(bonusPoint);
    }

    const scoreRate = data.get("scoreRate");
    if (scoreRate !== null) {
      settingData.defaultScoreRate = Number(scoreRate);
    }

    const chipRate = data.get("chipRate");
    if (chipRate !== null) {
      settingData.defaultChipRate = Number(chipRate);
    }

    // 既存の設定を取得
    const existingSetting = await db
      .selectFrom("Setting")
      .selectAll()
      .executeTakeFirst();

    if (existingSetting) {
      // 更新処理（部分更新）
      const updateData: UpdateSetting = {
        ...settingData,
        updatedAt: new Date(),
      } as UpdateSetting;

      await db
        .updateTable("Setting")
        .set(updateData)
        .where("id", "=", existingSetting.id)
        .execute();
    } else {
      // 新規作成（デフォルト値で補完）
      const createData: CreateSetting = {
        id: v4(),
        defaultInitialPoint:
          settingData.defaultInitialPoint ?? DEFAULT_GAME_RULES.initialPoint,
        defaultReturnPoint:
          settingData.defaultReturnPoint ?? DEFAULT_GAME_RULES.returnPoint,
        defaultBonusPoint:
          settingData.defaultBonusPoint ?? DEFAULT_GAME_RULES.bonusPoint,
        defaultScoreRate:
          settingData.defaultScoreRate ?? DEFAULT_GAME_RULES.scoreRate,
        defaultChipRate:
          settingData.defaultChipRate ?? DEFAULT_GAME_RULES.chipRate,
      };

      await db.insertInto("Setting").values(createData).execute();
    }

    await revalidateAll();

    return {
      success: true,
      message: "設定が保存されました",
      redirect: "/setting/room-setting",
    };
  } catch (_error) {
    return {
      success: false,
      message: "設定の保存に失敗しました",
      redirect: "/setting/room-setting",
    };
  }
};
