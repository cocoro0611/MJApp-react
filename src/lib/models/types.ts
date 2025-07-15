import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
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
    cognitoUserId: string;
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
export type Setting = {
    id: Generated<string>;
    cognitoUserId: string;
    defaultInitialPoint: number | null;
    defaultReturnPoint: number | null;
    defaultBonusPoint: string | null;
    defaultScoreRate: number | null;
    defaultChipRate: number | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    isShowPoint: Generated<boolean | null>;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type User = {
    id: Generated<string>;
    cognitoUserId: string;
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
    Setting: Setting;
    User: User;
};
