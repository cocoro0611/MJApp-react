"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { v4 } from "uuid";
import { db } from "../../../db";
import type {
  CreateRoom,
  CreateRoomUser,
  CreateScore,
  CreateSetting,
  UpdateSetting,
} from "../../type";

export const createRoom = async (data: FormData) => {
  try {
    const userIds = data.getAll("userIds");

    const room: CreateRoom = {
      id: v4(),
      name: String(data.get("name")),
      initialPoint: Number(data.get("initialPoint")),
      returnPoint: Number(data.get("returnPoint")),
      bonusPoint: String(data.get("bonusPoint")),
      scoreRate: Number(data.get("scoreRate")),
      chipRate: Number(data.get("chipRate")),
      gameAmount: Number(data.get("gameAmount")),
    };

    const roomUsers: CreateRoomUser[] = userIds.map((userId, index) => ({
      position: index + 1,
      userId: String(userId),
      roomId: room.id,
    }));

    const score: CreateScore[] = userIds.map((userId, index) => ({
      score: 0,
      gameCount: 1,
      order: index + 1,
      scoreResult: 0,
      userId: String(userId),
      roomId: room.id,
    }));

    const setting = {
      defaultInitialPoint: room.initialPoint,
      defaultReturnPoint: room.returnPoint,
      defaultBonusPoint: room.bonusPoint,
      defaultScoreRate: room.scoreRate,
      defaultChipRate: room.chipRate,
    };

    const createSetting: CreateSetting = {
      id: v4(),
      ...setting,
    };

    const updateSetting: UpdateSetting = {
      ...setting,
      updatedAt: new Date(),
    };

    await db.transaction().execute(async (trx) => {
      await trx.insertInto("Room").values(room).execute();
      await trx.insertInto("RoomUser").values(roomUsers).execute();
      await trx.insertInto("Score").values(score).execute();

      // Settingへの登録
      const existingSetting = await trx
        .selectFrom("Setting")
        .select("id")
        .executeTakeFirst();

      if (existingSetting) {
        await trx
          .updateTable("Setting")
          .set(updateSetting)
          .where("id", "=", existingSetting.id)
          .execute();
      } else {
        await trx.insertInto("Setting").values(createSetting).execute();
      }
    });

    await revalidateAll();

    return {
      success: true,
      message: "ルームが作成されました",
      redirect: `/rooms/${room.id}`,
    };
  } catch (_error) {
    return {
      success: false,
      message: "ルームの作成に失敗しました",
      redirect: "/rooms",
    };
  }
};
