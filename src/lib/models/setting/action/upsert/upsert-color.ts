"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { revalidatePath, revalidateTag } from "next/cache";
import { v4 } from "uuid";
import { requireAuth } from "../../../utils/auth-cognito";
import { upsertSetting } from "../../../utils/upsert-setting";
import type { CreateColor, UpdateColor } from "../../type";

export const upsertColor = async (data: FormData) => {
  try {
    const cognitoUserId = await requireAuth();

    const setting = {
      primaryColor: String(data.get("primaryColor")),
      secondaryColor: String(data.get("secondaryColor")),
    };

    const createColor: CreateColor = {
      id: v4(),
      cognitoUserId: cognitoUserId,
      ...setting,
    };

    const updateColor: UpdateColor = {
      ...setting,
      updatedAt: new Date(),
    };

    // SettingへのUpsert
    await upsertSetting(createColor, updateColor);
    await revalidateAll();

    // 複数の方法でキャッシュクリア
    revalidatePath("/manifest.json");
    revalidatePath("/manifest.json", "page");
    revalidateTag("manifest");

    return {
      success: true,
      message: "ルームのテーマカラーが保存されました",
      redirect: "/setting/color-setting",
    };
  } catch (_error) {
    return {
      success: false,
      message: "ルームのテーマカラーの保存に失敗しました",
      redirect: "/setting/color-setting",
    };
  }
};
