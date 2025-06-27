"use server";

import { revalidateAll } from "../../revalidate-wrapper";
import { db } from "../../db";

export const deleteUser = async (data: FormData) => {
  try {
    const userId = data.get("id") as string;
    await db.deleteFrom("User").where("id", "=", userId).execute();
    await revalidateAll();

    return {
      success: true,
      message: "ユーザーが削除されました",
      redirect: "/users",
    };
  } catch (_error) {
    return {
      success: false,
      message: "ユーザーの削除に失敗しました",
      redirect: "/users",
    };
  }
};
