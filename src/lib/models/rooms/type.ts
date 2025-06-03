import type { Room, RoomUser } from "../types";
import type { UserData } from "../users/type";
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
  "position" | "userId" | "roomId" | "createdAt" | "updatedAt"
>;

export type ReadRoomData = Pick<RoomData, "id" | "name"> & {
  users: (Pick<UserData, "id" | "name" | "icon"> & {
    totalScore: number;
  })[];
};

export type ReadRoomDetailData = Pick<RoomData, "id" | "name"> & {
  users: (Pick<UserData, "id" | "name" | "icon"> & {
    totalScore: number;
    totalChip: number;
    totalPoint: number;
  })[];
};
