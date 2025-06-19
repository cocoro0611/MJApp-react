"use server";

import { db } from "../../db";
import type { RoomData } from "../type";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";

type RoomUpdateData = Omit<RoomData, "id" | "createdAt">;

export const updateRoom = async (data: FormData) => {
  const roomId = String(data.get("roomId"));

  const roomData: RoomUpdateData = {
    name: String(data.get("name")),
    initialPoint: Number(data.get("initialPoint")),
    returnPoint: Number(data.get("returnPoint")),
    bonusPoint: String(data.get("bonusPoint")),
    scoreRate: Number(data.get("scoreRate")),
    chipRate: Number(data.get("chipRate")),
    gameAmount: Number(data.get("gameAmount")),
    updatedAt: new Date(),
  };

  await db.updateTable("Room").set(roomData).where("id", "=", roomId).execute();

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
