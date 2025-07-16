"use server";

import { revalidateAll } from "../../../../revalidate-wrapper";
import { v4 } from "uuid";
import { requireAuth } from "../../../../utils/auth-cognito";
import { upsertSetting } from "../../../../utils/upsert-setting";

export const upsertDefaultReturnPoint = async (data: FormData) => {
  try {
    const cognitoUserId = await requireAuth();

    const setting = {
      defaultReturnPoint: Number(data.get("returnPoint")),
    };

    const createDefaultCustomRoom = {
      id: v4(),
      cognitoUserId: cognitoUserId,
      ...setting,
    };

    const updateDefaultCustomRoom = {
      ...setting,
      updatedAt: new Date(),
    };

    // SettingへのUpsert
    await upsertSetting(createDefaultCustomRoom, updateDefaultCustomRoom);
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
