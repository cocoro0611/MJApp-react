import { db } from "../db";
import { requireAuth } from "./auth-cognito";
import type { Insertable, Updateable, Transaction } from "kysely";
import type { DB } from "../types";

// 通常版
export const upsertSetting = async (
  createData: Insertable<DB["Setting"]>,
  updateData: Updateable<DB["Setting"]>
) => {
  const cognitoUserId = await requireAuth();

  const existingSetting = await db
    .selectFrom("Setting")
    .where("cognitoUserId", "=", cognitoUserId)
    .select("id")
    .executeTakeFirst();

  if (existingSetting) {
    await db
      .updateTable("Setting")
      .set(updateData)
      .where("id", "=", existingSetting.id)
      .execute();
  } else {
    await db.insertInto("Setting").values(createData).execute();
  }
};

// トランザクション対応版
export const upsertSettingTrx = async (
  trx: Transaction<DB>,
  createData: Insertable<DB["Setting"]>,
  updateData: Updateable<DB["Setting"]>
) => {
  const cognitoUserId = await requireAuth();

  const existingSetting = await trx
    .selectFrom("Setting")
    .where("cognitoUserId", "=", cognitoUserId)
    .select("id")
    .executeTakeFirst();

  if (existingSetting) {
    await trx
      .updateTable("Setting")
      .set(updateData)
      .where("id", "=", existingSetting.id)
      .execute();
  } else {
    await trx.insertInto("Setting").values(createData).execute();
  }
};
