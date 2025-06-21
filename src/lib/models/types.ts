import type { ColumnType } from "kysely";
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Chip = {
  chip: number;
  gameCount: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  userId: string;
  roomId: string;
};
export type Room = {
  id: Generated<string>;
  name: string;
  initialPoint: number;
  returnPoint: number;
  bonusPoint: string;
  scoreRate: number;
  chipRate: number;
  gameAmount: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type RoomUser = {
  position: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  userId: string;
  roomId: string;
};
export type Score = {
  score: number;
  gameCount: number;
  order: number;
  scoreResult: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  userId: string;
  roomId: string;
};
export type User = {
  id: Generated<string>;
  name: string;
  icon: string;
  isDefaultUser: boolean;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type DB = {
  Chip: Chip;
  Room: Room;
  RoomUser: RoomUser;
  Score: Score;
  User: User;
};
