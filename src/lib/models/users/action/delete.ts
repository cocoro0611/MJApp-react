"use server";

// MEMO: 削除されたデータを参照するページが再レンダリングされて500errorになるため
import { revalidateAll } from "../../revalidate-wrapper";
import { db } from "../../db";
import { redirect } from "next/navigation";

export const deleteUser = async (data: FormData) => {
  const userId = data.get("id") as string;

  const deleteUser = await db
    .deleteFrom("User")
    .where("id", "=", userId)
    .execute();

  if (!deleteUser) {
    await revalidateAll();
    redirect("/users?error=failed");
  }

  await revalidateAll();
  redirect("/users?message=deleted");
};
