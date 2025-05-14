"use server";

import { db } from "../db";
import type { UserData } from "./type";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";

type UserUpdateData = Omit<UserData, "defaultSelected" | "createdAt">;

export const updateUser = async (data: FormData) => {
  const userId = String(data.get("id"));
  const userData: UserUpdateData = {
    id: userId,
    name: String(data.get("name")),
    icon: String(data.get("icon")),
    updatedAt: new Date(),
  };
  await db.updateTable("User").set(userData).where("id", "=", userId).execute();

  // Toastの都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect("/users");
};

export const updateDefaultUser = async (data: FormData) => {
  const selectedUserIds = data.getAll("userIds").map((id) => String(id));

  await db.transaction().execute(async (trx) => {
    await trx.updateTable("User").set({ defaultSelected: false }).execute();

    if (selectedUserIds.length > 0) {
      await trx
        .updateTable("User")
        .set({ defaultSelected: true })
        .where("id", "in", selectedUserIds)
        .execute();
    }
  });

  // これは瞬時に反映してほしいので、Toastの設定はなし
  redirect("/rooms/new");
};
