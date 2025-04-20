"use server";

import { db } from "../db";

export const deleteUser = async (data: FormData) => {
  const userId = data.get("id") as string;
  await db.deleteFrom("User").where("id", "=", userId).execute();
};
