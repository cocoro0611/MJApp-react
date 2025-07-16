"use server";

import { db } from "../../../db";
import { requireAuth } from "../../../utils/auth-cognito";
import type { ReadUser } from "../../type";

export const readDefaultUsers = async (): Promise<ReadUser[]> => {
  const cognitoUserId = await requireAuth();

  const defaultUsers = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "isDefaultUser"])
    .where("cognitoUserId", "=", cognitoUserId)
    .where("isDefaultUser", "=", true)
    .orderBy("createdAt", "asc")
    .execute();

  return defaultUsers;
};
