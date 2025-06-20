import type { User, Room, RoomUser, Score, Chip } from "../types";
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
  scores: ScoreData[];
};

type ScoreData = Pick<TS<RoomUser>, "position"> &
  Pick<TS<Score>, "score"> & {
    scoreResult: number;
  };

export type ReadChip = Pick<TS<Chip>, "gameCount"> & {
  chips: ChipData[];
};

type ChipData = Pick<TS<RoomUser>, "position"> & Pick<TS<Chip>, "chip">;

// CreateData
export type CreateRoom = Omit<TS<Room>, "createdAt" | "updatedAt">;

export type CreateRoomUser = Omit<TS<RoomUser>, "createdAt" | "updatedAt">;

export type CreateScore = Omit<TS<Score>, "createdAt" | "updatedAt">;

export type CreateChip = Omit<TS<Chip>, "createdAt" | "updatedAt">;

// UpdateData
export type UpdateRoom = Omit<TS<Room>, "id" | "createdAt">;
