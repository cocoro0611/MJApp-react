import type { Score, Chip } from "../types";
import { TS } from "../types-utils";

export type ScoreData = Pick<
  TS<Score>,
  | "id"
  | "input"
  | "score"
  | "gameCount"
  | "userId"
  | "roomId"
  | "createdAt"
  | "updatedAt"
>;

export type ChipData = Pick<
  TS<Chip>,
  | "id"
  | "input"
  | "chip"
  | "gameCount"
  | "userId"
  | "roomId"
  | "createdAt"
  | "updatedAt"
>;
