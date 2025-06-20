"use server";

import { db } from "../../../db";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";
import type { UpdateUser } from "../../type";

export const updateUser = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const userId = String(data.get("userId"));

  const user: UpdateUser = {
    name: String(data.get("name")),
    icon: String(data.get("icon")),
    updatedAt: new Date(),
  };
  await db.updateTable("User").set(user).where("id", "=", userId).execute();

  // Toastの都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));

  // roomPageかuserPageかによってリダイレクト先を変更
  const redirectUrl = roomId ? `/rooms/${roomId}` : "/users";
  redirect(redirectUrl);
};
