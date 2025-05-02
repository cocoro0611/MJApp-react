"use server";

import { db } from "../db";
import { redirect } from "next/navigation";

export const deleteUser = async (data: FormData) => {
  const userId = data.get("id") as string;
  await db.deleteFrom("User").where("id", "=", userId).execute();

  // Toastの都合上1s遅延を設定
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redirect("/users");
};
