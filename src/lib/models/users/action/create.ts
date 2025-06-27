"use server";

import { v4 } from "uuid";
import { db } from "../../db";
import { readDefaultUsers } from "./read/read-default-users";
import type { CreateUser } from "../type";

export const createUser = async (data: FormData) => {
  try {
    const defaultUsers = await readDefaultUsers();

    const user: CreateUser = {
      id: v4(),
      name: String(data.get("name")),
      icon: String(data.get("icon")),
      isDefaultUser: defaultUsers.length < 4,
    };
    await db.insertInto("User").values(user).execute();

    return {
      success: true,
      message: "ユーザーが作成されました",
      redirect: "/users",
    };
  } catch (error) {
    return {
      success: false,
      message: "ユーザーの作成に失敗しました",
      redirect: "/users",
    };
  }
};
