"use client";

import { useState } from "react";

export const useKeyboard = (onValueChange?: (newValue: number) => void) => {
  const [currentValue, setCurrentValue] = useState(0);

  const playClickSound = () => {
    try {
      // 音声再生
      const audio = new Audio("/sounds/click.mp3");
      audio.play().catch((error) => console.log("Audio play failed:", error));

      // バイブレーション
      if ("vibrate" in navigator) {
        navigator.vibrate(100); // 100ms振動
      }
    } catch (error) {
      console.log("Audio creation failed:", error);
    }
  };

  const resetValue = (initialValue: number) => {
    setCurrentValue(initialValue);
  };

  const notifyChange = (newValue: number) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const addDigit = (digit: number, maxLength: number) => {
    playClickSound();
    const valueStr = String(Math.abs(currentValue)); // 絶対値で処理
    const isNegative = currentValue < 0;

    // 桁数チェック
    if (valueStr.length >= maxLength && valueStr !== "0") {
      return;
    }

    const newValueStr =
      valueStr === "0" ? String(digit) : valueStr + String(digit);
    const newValue = isNegative ? -Number(newValueStr) : Number(newValueStr);

    setCurrentValue(newValue);
    notifyChange(newValue);
  };

  const toggleSign = () => {
    if (currentValue === 0) return;

    const newValue = -currentValue;
    setCurrentValue(newValue);
    notifyChange(newValue);
  };

  const removeDigit = () => {
    const valueStr = String(Math.abs(currentValue)); // 絶対値で処理
    const isNegative = currentValue < 0;

    const newValueStr = valueStr.length > 1 ? valueStr.slice(0, -1) : "0";
    const newValue =
      isNegative && newValueStr !== "0"
        ? -Number(newValueStr)
        : Number(newValueStr);

    setCurrentValue(newValue);
    notifyChange(newValue);
  };

  return { resetValue, addDigit, toggleSign, removeDigit };
};
