"use client";

import { useState } from "react";
import type { ReadChip } from "@/src/lib/models/rooms/type";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

export const useChipEditor = (chips: ReadChip[]) => {
  const [chipEdits, setChipEdits] = useState<{ [key: string]: number }>({});

  // チップ編集
  const editChip = (
    gameCount: number,
    playerIndex: number,
    newChip: number
  ) => {
    const key = `${gameCount}-${playerIndex}`;
    setChipEdits((prev) => ({ ...prev, [key]: newChip }));
  };

  // チップ取得
  const getChip = (gameCount: number, playerIndex: number) => {
    const key = `${gameCount}-${playerIndex}`;

    if (chipEdits[key] !== undefined) {
      return chipEdits[key];
    }

    const gameChip = chips.find((s) => s.gameCount === gameCount);
    const chipItem = gameChip?.chips[playerIndex];

    return chipItem ? chipItem.chip : 0;
  };

  // ゲーム合計チップ計算
  const getGameTotal = (gameCount: number) => {
    const gameChip = chips.find((s) => s.gameCount === gameCount);
    if (!gameChip) return 0;

    return gameChip.chips.reduce((sum, chipItem, index) => {
      return sum + getChip(gameCount, index);
    }, 0);
  };

  // 残り必要なチップを計算
  const getRemainingChip = (gameCount: number) => {
    const TOTAL_CHIP = 20 * MAX_ROOM_PLAYERS;
    const currentTotal = getGameTotal(gameCount);
    return TOTAL_CHIP - currentTotal;
  };

  // 完成状況チェック
  const isCompleteChip = (gameCount: number) => {
    const TOTAL_CHIP = 20 * MAX_ROOM_PLAYERS;
    return getGameTotal(gameCount) === TOTAL_CHIP;
  };

  return { editChip, getChip, getRemainingChip, isCompleteChip };
};
