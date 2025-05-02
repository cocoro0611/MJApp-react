import type { ColumnType } from "kysely";
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Chip = {
  id: Generated<string>;
  input: number;
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
  id: Generated<string>;
  position: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  userId: string;
  roomId: string;
};
export type Score = {
  id: Generated<string>;
  input: number;
  score: number;
  gameCount: number;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  userId: string;
  roomId: string;
};
export type User = {
  id: Generated<string>;
  name: string;
  icon: string;
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
