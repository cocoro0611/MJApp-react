"use server";

import { db } from "../db";
import type { UserData } from "./type";
import { redirect } from "next/navigation";

type UserUpdateData = Omit<UserData, "createdAt">;

export const updateUser = async (data: FormData) => {
  const userId = data.get("id") as string;
  const userData: UserUpdateData = {
    id: userId,
    name: data.get("name") as string,
    icon: data.get("icon") as string,
    updatedAt: new Date(),
  };
  await db.updateTable("User").set(userData).where("id", "=", userId).execute();
  redirect("/users");
};
