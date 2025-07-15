"use server";

import { revalidateAll } from "../../revalidate-wrapper";
import { v4 } from "uuid";
import { db } from "../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { readDefaultUsers } from "./read/read-default-users";
import type { CreateUser } from "../type";

export const createUser = async (data: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const defaultUsers = await readDefaultUsers();

    // 認証チェック
    if (!session?.user?.id) {
      return { success: false, message: "認証が必要です" };
    }

    const user: CreateUser = {
      id: v4(),
      cognitoUserId: session.user.id,
      name: String(data.get("name")),
      icon: String(data.get("icon")),
      isDefaultUser: defaultUsers.length < 4,
    };
    await db.insertInto("User").values(user).execute();
    await revalidateAll();

    return {
      success: true,
      message: "ユーザーが作成されました",
      redirect: "/users",
    };
  } catch (_error) {
    return {
      success: false,
      message: "ユーザーの作成に失敗しました",
      redirect: "/users",
    };
  }
};
