"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { v4 } from "uuid";
import { requireAuth } from "../../../utils/auth-cognito";
import { upsertSetting } from "../../../utils/upsert-setting";
import type { CreateShowPoint, UpdateShowPoint } from "../../type";

export const upsertShowPoint = async (data: FormData) => {
  try {
    const cognitoUserId = await requireAuth();

    // !!で明示的にbooleanに変換
    const isShowPoint = !!data.get("isShowPoint");

    const createShowPoint: CreateShowPoint = {
      id: v4(),
      cognitoUserId: cognitoUserId,
      isShowPoint: isShowPoint,
    };

    const updateShowPoint: UpdateShowPoint = {
      isShowPoint: isShowPoint,
      updatedAt: new Date(),
    };

    // SettingへのUpsert
    await upsertSetting(createShowPoint, updateShowPoint);
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
