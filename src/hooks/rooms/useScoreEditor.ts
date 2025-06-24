"use client";

import { useState } from "react";
import type { ReadScore } from "@/src/lib/models/rooms/type";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

export const useScoreEditor = (scores: ReadScore[], initialPoint: number) => {
  const [scoreEdits, setScoreEdits] = useState<{ [key: string]: number }>({});

  // スコア更新
  const updateScore = (
    gameCount: number,
    playerIndex: number,
    newScore: number
  ) => {
    const key = `${gameCount}-${playerIndex}`;
    setScoreEdits((prev) => ({ ...prev, [key]: newScore }));
  };

  // スコア取得
  const getScore = (gameCount: number, playerIndex: number) => {
    const key = `${gameCount}-${playerIndex}`;

    if (scoreEdits[key] !== undefined) {
      return scoreEdits[key];
    }

    const gameScore = scores.find((s) => s.gameCount === gameCount);
    const scoreItem = gameScore?.scores[playerIndex];

    return scoreItem ? scoreItem.score / 100 : 0;
  };

  // ゲーム合計スコア計算
  const getGameTotal = (gameCount: number) => {
    const gameScore = scores.find((s) => s.gameCount === gameCount);
    if (!gameScore) return 0;

    return gameScore.scores.reduce((sum, scoreItem, index) => {
      return sum + getScore(gameCount, index) * 100;
    }, 0);
  };

  // 残り必要な点数を計算
  const getRemaining = (gameCount: number) => {
    const TOTAL_SCORE = initialPoint * MAX_ROOM_PLAYERS;
    const currentTotal = getGameTotal(gameCount);
    return TOTAL_SCORE - currentTotal;
  };

  // 完成状況チェック
  const isComplete = (gameCount: number) => {
    const TOTAL_SCORE = initialPoint * MAX_ROOM_PLAYERS;
    return getGameTotal(gameCount) === TOTAL_SCORE;
  };

  return { updateScore, getScore, getGameTotal, getRemaining, isComplete };
};
