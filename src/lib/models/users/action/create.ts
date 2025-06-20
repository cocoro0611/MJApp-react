"use server";

import { v4 } from "uuid";
import { db } from "../../db";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";
import { readDefaultUsers } from "./read/read-default-users";
import type { CreateUser } from "../type";

export const createUser = async (data: FormData) => {
  const defaultUsers = await readDefaultUsers();

  const user: CreateUser = {
    id: v4(),
    name: String(data.get("name")),
    icon: String(data.get("icon")),
    isDefaultUser: defaultUsers.length < 4,
  };
  await db.insertInto("User").values(user).execute();

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect("/users/");
};
