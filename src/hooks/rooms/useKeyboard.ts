"use client";

import { useState } from "react";
import { useClickSound } from "../sounds/useClickSound";

export const useKeyboard = (onValueChange?: (newValue: number) => void) => {
  const [currentValue, setCurrentValue] = useState(0);
  const { playClick } = useClickSound();

  const resetValue = (initialValue: number) => {
    setCurrentValue(initialValue);
  };

  const notifyChange = (newValue: number) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const addDigit = (digit: number, maxLength: number) => {
    playClick(); // クリック音再生
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
    playClick();
    if (currentValue === 0) return;

    const newValue = -currentValue;
    setCurrentValue(newValue);
    notifyChange(newValue);
  };

  const removeDigit = () => {
    playClick();
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
