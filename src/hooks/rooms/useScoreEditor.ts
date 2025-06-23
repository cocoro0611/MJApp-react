"use client";

import { useState } from "react";
import type { ReadScore } from "@/src/lib/models/rooms/type";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

export const useScoreEditor = (scores: ReadScore[], initialPoint: number) => {
  const [editScores, setEditScores] = useState<{ [key: string]: number }>({});

  // 書き込み
  const setScore = (
    gameCount: number,
    playerIndex: number,
    newScore: number
  ) => {
    const key = `${gameCount}-${playerIndex}`;
    setEditScores((prev) => ({ ...prev, [key]: newScore }));
  };

  // 読み込み
  const getScore = (gameCount: number, playerIndex: number) => {
    const key = `${gameCount}-${playerIndex}`;

    if (editScores[key] !== undefined) {
      return editScores[key];
    }

    const gameScore = scores.find((s) => s.gameCount === gameCount);
    const scoreItem = gameScore?.scores[playerIndex];

    return scoreItem ? scoreItem.score / 100 : 0;
  };

  // 合計スコア計算を追加
  const getTotalScore = (gameCount: number) => {
    const gameScore = scores.find((s) => s.gameCount === gameCount);
    if (!gameScore) return 0;

    return gameScore.scores.reduce((sum, scoreItem, index) => {
      return sum + getScore(gameCount, index) * 100;
    }, 0);
  };

  // 残り必要な点数を計算
  const getRemainingScore = (gameCount: number) => {
    const TOTAL_SCORE = initialPoint * MAX_ROOM_PLAYERS;
    const currentTotal = getTotalScore(gameCount);
    return TOTAL_SCORE - currentTotal;
  };

  // 完成状況チェック
  const isComplete = (gameCount: number) => {
    const TOTAL_SCORE = initialPoint * MAX_ROOM_PLAYERS;
    return getTotalScore(gameCount) === TOTAL_SCORE;
  };

  return { setScore, getScore, getTotalScore, getRemainingScore, isComplete };
};
