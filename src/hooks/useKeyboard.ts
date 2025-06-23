"use client";

import { useState } from "react";

export const useKeyboard = (onScoreUpdate?: (updateScore: number) => void) => {
  const [score, setScore] = useState("0");
  const [waitingForValue, setWaitingForValue] = useState(false);

  // 共通の更新処理
  const updateScore = (newScore: string) => {
    if (onScoreUpdate) {
      const updateScore = Number(newScore) * 100;
      onScoreUpdate(updateScore);
    }
  };

  const inputNumber = (num: number) => {
    const numStr = String(num);
    let newScore;

    if (waitingForValue) {
      newScore = numStr;
      setWaitingForValue(false);
    } else {
      newScore = score === "0" ? numStr : score + numStr;
    }

    setScore(newScore);
    updateScore(newScore); // 共通処理を使用
  };

  const signNum = () => {
    if (score === "0") return;

    const newScore = score.startsWith("-") ? score.slice(1) : "-" + score;

    setScore(newScore);
    updateScore(newScore); // 共通処理を使用
  };

  const deleteNum = () => {
    const newScore = score.length > 1 ? score.slice(0, -1) : "0";

    setScore(newScore);
    updateScore(newScore); // 共通処理を使用
  };

  return {
    score,
    setScore,
    inputNumber,
    signNum,
    deleteNum,
  };
};
