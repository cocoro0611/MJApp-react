import type { Room, RoomUser, Score, Chip } from "../types";
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

export type ScoreData = Pick<
  TS<Score>,
  | "score"
  | "gameCount"
  | "order"
  | "userId"
  | "roomId"
  | "createdAt"
  | "updatedAt"
>;

export type ChipData = Pick<
  TS<Chip>,
  "chip" | "gameCount" | "userId" | "roomId" | "createdAt" | "updatedAt"
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

export type RoomDetailUserData = Pick<UserData, "id" | "name" | "icon"> & {
  totalScore: number;
  totalChip: number;
  totalPoint: number;
};

export type ReadRoomDetailData = Pick<
  RoomData,
  | "id"
  | "name"
  | "initialPoint"
  | "returnPoint"
  | "bonusPoint"
  | "scoreRate"
  | "chipRate"
  | "gameAmount"
> & {
  users: RoomDetailUserData[];
};

export type ReadScoreData = Pick<ScoreData, "gameCount"> & {
  scores: (Pick<RoomUserData, "position"> &
    Pick<ScoreData, "score"> & {
      scoreResult: number;
    })[];
};

export type ReadChipData = Pick<ChipData, "gameCount"> & {
  chips: (Pick<RoomUserData, "position"> & Pick<ChipData, "chip">)[];
};
