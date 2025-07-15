"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { revalidatePath, revalidateTag } from "next/cache";
import { v4 } from "uuid";
import { db } from "../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import type { CreateColor, UpdateColor } from "../../type";

export const upsertColor = async (data: FormData) => {
  try {
    const session = await getServerSession(authOptions);

    // 認証チェック
    if (!session?.user?.id) {
      return { success: false, message: "認証が必要です" };
    }

    const existingSetting = await db
      .selectFrom("Setting")
      .where("cognitoUserId", "=", session.user.id)
      .select("id")
      .executeTakeFirst();

    if (existingSetting) {
      // 更新処理
      const color: UpdateColor = {
        primaryColor: String(data.get("primaryColor")),
        secondaryColor: String(data.get("secondaryColor")),
        updatedAt: new Date(),
      };
      await db
        .updateTable("Setting")
        .set(color)
        .where("id", "=", existingSetting?.id)
        .execute();
    } else {
      // 作成処理
      const color: CreateColor = {
        id: v4(),
        cognitoUserId: session.user.id,
        primaryColor: String(data.get("primaryColor")),
        secondaryColor: String(data.get("secondaryColor")),
      };
      await db.insertInto("Setting").values(color).execute();
    }

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
