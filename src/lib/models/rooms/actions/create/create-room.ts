"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { v4 } from "uuid";
import { db } from "../../../db";
import { requireAuth } from "../../../utils/auth-cognito";
import { upsertSettingTrx } from "../../../utils/upsert-setting";
import type {
  CreateRoom,
  CreateRoomUser,
  CreateScore,
  CreateDefaultRoom,
  UpdateDefaultRoom,
} from "../../type";

export const createRoom = async (data: FormData) => {
  try {
    const cognitoUserId = await requireAuth();
    const userIds = data.getAll("userIds");

    const room: CreateRoom = {
      id: v4(),
      cognitoUserId: cognitoUserId,
      name: String(data.get("name")),
      initialPoint: Number(data.get("initialPoint")),
      returnPoint: Number(data.get("returnPoint")),
      bonusPoint: String(data.get("bonusPoint")),
      scoreRate: Number(data.get("scoreRate")),
      chipRate: Number(data.get("chipRate")),
      gameAmount: Number(data.get("gameAmount")),
    };

    const roomUsers: CreateRoomUser[] = userIds.map((userId, index) => ({
      userId: String(userId),
      roomId: room.id,
      position: index + 1,
    }));

    const score: CreateScore[] = userIds.map((userId, index) => ({
      score: 0,
      scoreResult: 0,
      gameCount: 1,
      order: index + 1,
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

    const createDefaultRoom: CreateDefaultRoom = {
      id: v4(),
      cognitoUserId: cognitoUserId,
      ...setting,
    };

    const updateDefaultRoom: UpdateDefaultRoom = {
      ...setting,
      updatedAt: new Date(),
    };

    await db.transaction().execute(async (trx) => {
      await trx.insertInto("Room").values(room).execute();
      await trx.insertInto("RoomUser").values(roomUsers).execute();
      await trx.insertInto("Score").values(score).execute();
      await upsertSettingTrx(trx, createDefaultRoom, updateDefaultRoom);
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
