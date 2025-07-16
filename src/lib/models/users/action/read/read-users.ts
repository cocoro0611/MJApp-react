"use server";

import { db } from "../../../db";
import { requireAuth } from "../../../utils/auth-cognito";
import type { ReadUser } from "../../type";

export const readUsers = async (): Promise<ReadUser[]> => {
  const cognitoUserId = await requireAuth();

  const users = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "isDefaultUser"])
    .where("cognitoUserId", "=", cognitoUserId)
    .orderBy("createdAt", "asc")
    .execute();

  return users;
};
