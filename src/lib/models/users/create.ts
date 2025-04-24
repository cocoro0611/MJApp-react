"use server";

import { v4 } from "uuid";
import { db } from "../db";
import type { UserData } from "./type";
import { redirect } from "next/navigation";

type UserCreateData = Omit<UserData, "createdAt" | "updatedAt">;

export const createUser = async (data: FormData) => {
  const userData: UserCreateData = {
    id: v4(),
    name: data.get("name") as string,
    icon: data.get("icon") as string,
  };
  await db.insertInto("User").values(userData).execute();
  redirect("/users/");
};
