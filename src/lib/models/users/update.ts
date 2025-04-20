"use server";

import { db } from "../db";
import type { UserData } from "./type";

export const updateUser = async (data: FormData) => {
  const userId = data.get("id") as string;
  const userData: UserData = {
    id: userId,
    name: data.get("name") as string,
    createdAt: new Date(),
  };
  await db.updateTable("User").set(userData).where("id", "=", userId).execute();
};
