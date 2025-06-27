"use server";

import { db } from "../../../db";
import type { UpdateUser } from "../../type";

export const updateUser = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const userId = String(data.get("userId"));
  const redirectUrl = roomId ? `/rooms/${roomId}` : "/users"; // 先に定義

  try {
    const user: UpdateUser = {
      name: String(data.get("name")),
      icon: String(data.get("icon")),
      updatedAt: new Date(),
    };
    await db.updateTable("User").set(user).where("id", "=", userId).execute();

    return {
      success: true,
      message: "ユーザーが更新されました",
      redirect: redirectUrl,
    };
  } catch (error) {
    return {
      success: false,
      message: "ユーザーの更新に失敗しました",
      redirect: redirectUrl,
    };
  }
};
