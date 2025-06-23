"use client";

import { useState } from "react";
import type { ReadScore } from "@/src/lib/models/rooms/type";

export const useScoreEditor = (scores: ReadScore[]) => {
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

    // 編集中の値があればそれを返す
    if (editScores[key] !== undefined) {
      return editScores[key];
    }

    // なければ元の値を返す
    const gameScore = scores.find((s) => s.gameCount === gameCount);
    const scoreItem = gameScore?.scores[playerIndex];

    return scoreItem ? scoreItem.score : 0;
  };

  return { setScore, getScore };
};
