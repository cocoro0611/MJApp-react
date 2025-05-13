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
