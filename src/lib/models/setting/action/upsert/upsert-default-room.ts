"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { v4 } from "uuid";
import { requireAuth } from "../../../utils/auth-cognito";
import { upsertSetting } from "../../../utils/upsert-setting";
import type { CreateDefaultRoom, UpdateDefaultRoom } from "../../type";

export const upsertDefaultRoom = async (data: FormData) => {
  try {
    const cognitoUserId = await requireAuth();

    const setting = {
      defaultInitialPoint: Number(data.get("initialPoint")),
      defaultReturnPoint: Number(data.get("returnPoint")),
      defaultBonusPoint: String(data.get("bonusPoint")),
      defaultScoreRate: Number(data.get("scoreRate")),
      defaultChipRate: Number(data.get("chipRate")),
    };

    const createDefaultRoom: CreateDefaultRoom = {
      id: v4(),
      cognitoUserId: cognitoUserId,
      ...setting,
    };

    const updateDefaultRoom: UpdateDefaultRoom = {
      ...setting,
      updatedAt: new Date(),
    };

    // SettingへのUpsert
    await upsertSetting(createDefaultRoom, updateDefaultRoom);
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
