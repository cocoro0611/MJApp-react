"use client";

import { useState } from "react";

export const useKeyboard = (onScoreUpdate?: (updateScore: number) => void) => {
  const [score, setScore] = useState(0);

  const initScore = (initScore: number) => {
    setScore(initScore);
  };

  const updateScore = (newScore: number) => {
    if (onScoreUpdate) {
      onScoreUpdate(newScore);
    }
  };

  const inputNumber = (num: number) => {
    const scoreStr = String(Math.abs(score)); // 絶対値で処理
    const isNegative = score < 0;

    const newScoreStr = scoreStr === "0" ? String(num) : scoreStr + String(num);
    const newScore = isNegative ? -Number(newScoreStr) : Number(newScoreStr);

    setScore(newScore);
    updateScore(newScore);
  };

  const signNum = () => {
    if (score === 0) return;

    const newScore = -score;

    setScore(newScore);
    updateScore(newScore);
  };

  const deleteNum = () => {
    const scoreStr = String(Math.abs(score)); // 絶対値で処理
    const isNegative = score < 0;

    const newScoreStr = scoreStr.length > 1 ? scoreStr.slice(0, -1) : "0";
    const newScore =
      isNegative && newScoreStr !== "0"
        ? -Number(newScoreStr)
        : Number(newScoreStr);

    setScore(newScore);
    updateScore(newScore);
  };

  return {
    score,
    setScore,
    initScore,
    inputNumber,
    signNum,
    deleteNum,
  };
};
