import type { User, Room, RoomUser, Score, Chip, Setting } from "../types";
import { TS } from "../kysely-utils";

// ReadData
export type ReadRoom = Pick<TS<Room>, "id" | "name"> & {
  users: RoomUserData[];
};

type RoomUserData = Pick<TS<User>, "id" | "name" | "icon"> & {
  totalScore: number;
};

export type ReadRoomDetail = Pick<
  TS<Room>,
  | "id"
  | "name"
  | "initialPoint"
  | "returnPoint"
  | "bonusPoint"
  | "scoreRate"
  | "chipRate"
  | "gameAmount"
> & {
  users: ReadRoomDetailUser[];
};

export type ReadRoomDetailUser = Pick<TS<User>, "id" | "name" | "icon"> & {
  totalScore: number;
  totalChip: number;
  totalPoint: number;
};

export type ReadScore = Pick<TS<Score>, "gameCount"> & {
  scores: Pick<TS<Score>, "score" | "scoreResult">[];
};

export type ReadChip = Pick<TS<Chip>, "gameCount"> & {
  chips: Pick<TS<Chip>, "chip">[];
};

export type ReadDefaultRoom = Pick<
  TS<Setting>,
  | "defaultInitialPoint"
  | "defaultReturnPoint"
  | "defaultBonusPoint"
  | "defaultScoreRate"
  | "defaultChipRate"
  | "isShowPoint"
>;

// CreateData
export type CreateRoom = Pick<
  TS<Room>,
  | "id"
  | "name"
  | "initialPoint"
  | "returnPoint"
  | "bonusPoint"
  | "scoreRate"
  | "chipRate"
  | "gameAmount"
>;

export type CreateRoomUser = Pick<
  TS<RoomUser>,
  "userId" | "roomId" | "position"
>;

export type CreateScore = Pick<
  TS<Score>,
  "score" | "scoreResult" | "gameCount" | "order" | "userId" | "roomId"
>;

export type CreateChip = Pick<
  TS<Chip>,
  "chip" | "gameCount" | "userId" | "roomId"
>;

export type CreateDefaultRoom = Pick<
  TS<Setting>,
  | "id"
  | "defaultInitialPoint"
  | "defaultReturnPoint"
  | "defaultBonusPoint"
  | "defaultScoreRate"
  | "defaultChipRate"
>;

// UpdateData
export type UpdateRoom = Pick<
  TS<Room>,
  | "name"
  | "initialPoint"
  | "returnPoint"
  | "bonusPoint"
  | "scoreRate"
  | "chipRate"
  | "gameAmount"
  | "updatedAt"
>;

export type UpdateScore = Pick<
  TS<Score>,
  | "score"
  | "scoreResult"
  | "gameCount"
  | "order"
  | "userId"
  | "roomId"
  | "updatedAt"
>;

export type UpdateDefaultRoom = Pick<
  TS<Setting>,
  | "defaultInitialPoint"
  | "defaultReturnPoint"
  | "defaultBonusPoint"
  | "defaultScoreRate"
  | "defaultChipRate"
  | "updatedAt"
>;
