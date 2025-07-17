"use server";

import { revalidateAll } from "../../../../revalidate-wrapper";
import { v4 } from "uuid";
import { requireAuth } from "../../../../utils/auth-cognito";
import { upsertSetting } from "../../../../utils/upsert-setting";

export const upsertDefaultChipRate = async (data: FormData) => {
  const isNewRoom = data.get("isNewRoom") === "true"; // /rooms/new から呼び出しているか
  const redirectUrl = isNewRoom ? "/rooms/new" : "/setting/room-setting"; // リダイレクト先

  try {
    const cognitoUserId = await requireAuth();

    const setting = {
      defaultChipRate: Number(data.get("chipRate")),
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
      redirect: redirectUrl,
    };
  } catch (_error) {
    return {
      success: false,
      message: "ルームのデフォルト設定の保存に失敗しました",
      redirect: redirectUrl,
    };
  }
};
