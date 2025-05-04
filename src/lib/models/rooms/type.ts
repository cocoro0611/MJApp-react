import type { Room, RoomUser } from "../types";
import { TS } from "../types-utils";

export type RoomData = Pick<
  TS<Room>,
  | "id"
  | "name"
  | "initialPoint"
  | "returnPoint"
  | "bonusPoint"
  | "scoreRate"
  | "chipRate"
  | "gameAmount"
  | "createdAt"
  | "updatedAt"
>;

export type RoomUserData = Pick<
  TS<RoomUser>,
  "id" | "position" | "userId" | "roomId" | "createdAt" | "updatedAt"
>;
