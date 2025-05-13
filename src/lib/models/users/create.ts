"use server";

import { v4 } from "uuid";
import { db } from "../db";
import type { UserData } from "./type";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";
import { readDefaultUsers } from "./read";

type UserCreateData = Omit<UserData, "createdAt" | "updatedAt">;

export const createUser = async (data: FormData) => {
  const defaultUsers = await readDefaultUsers();

  const userData: UserCreateData = {
    id: v4(),
    name: String(data.get("name")),
    icon: String(data.get("icon")),
    defaultSelected: defaultUsers.length < 4,
  };
  await db.insertInto("User").values(userData).execute();

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect("/users/");
};
