"use server";

import { v4 } from "uuid";
import { db } from "../db";
import type { UserData } from "./type";

export const createUser = async (data: FormData) => {
  const userData: UserData = {
    id: v4(),
    name: data.get("name") as string,
    createdAt: new Date(),
  };
  await db.insertInto("User").values(userData).execute();
};
