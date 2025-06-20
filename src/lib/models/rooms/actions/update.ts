"use server";

import { db } from "../../db";
import type { UpdateRoom } from "../type";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";

export const updateRoom = async (data: FormData) => {
  const roomId = String(data.get("roomId"));

  const room: UpdateRoom = {
    name: String(data.get("name")),
    initialPoint: Number(data.get("initialPoint")),
    returnPoint: Number(data.get("returnPoint")),
    bonusPoint: String(data.get("bonusPoint")),
    scoreRate: Number(data.get("scoreRate")),
    chipRate: Number(data.get("chipRate")),
    gameAmount: Number(data.get("gameAmount")),
    updatedAt: new Date(),
  };

  await db.updateTable("Room").set(room).where("id", "=", roomId).execute();

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
