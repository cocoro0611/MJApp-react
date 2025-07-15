"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { v4 } from "uuid";
import { db } from "../../../db";
import { ReadDefaultRoom } from "../../type";

export const upsertDefaultRoomCustom = async (data: FormData) => {
  try {
    const settingData: Record<string, any> = {};

    const initialPoint = data.get("initialPoint");
    if (initialPoint !== null)
      settingData.defaultInitialPoint = Number(initialPoint);

    const returnPoint = data.get("returnPoint");
    if (returnPoint !== null)
      settingData.defaultReturnPoint = Number(returnPoint);

    const bonusPoint = data.get("bonusPoint");
    if (bonusPoint !== null) settingData.defaultBonusPoint = String(bonusPoint);

    const scoreRate = data.get("scoreRate");
    if (scoreRate !== null) settingData.defaultScoreRate = Number(scoreRate);

    const chipRate = data.get("chipRate");
    if (chipRate !== null) settingData.defaultChipRate = Number(chipRate);

    const primaryColor = data.get("primaryColor");
    if (primaryColor !== null) settingData.primaryColor = String(primaryColor);

    const secondaryColor = data.get("secondaryColor");
    if (secondaryColor !== null)
      settingData.secondaryColor = String(secondaryColor);

    // 既存設定の確認
    const existingSetting = await db
      .selectFrom("Setting")
      .select("id")
      .executeTakeFirst();

    if (existingSetting) {
      // 更新
      await db
        .updateTable("Setting")
        .set({ ...settingData, updatedAt: new Date() })
        .where("id", "=", existingSetting.id)
        .execute();
    } else {
      // 新規作成
      await db
        .insertInto("Setting")
        .values({ id: v4(), ...settingData })
        .execute();
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
