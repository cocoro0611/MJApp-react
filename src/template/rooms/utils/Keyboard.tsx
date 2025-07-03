"use client";

import Button from "@/src/components/ui/Button";
import { ReactNode, useEffect } from "react";
import { useKeyboard } from "@/src/hooks/rooms/useKeyboard";

interface KeyboardProps {
  children: ReactNode;
  value?: number;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onValueChange?: (newValue: number) => void;
  maxLength: number;
}

const Keyboard = ({
  children,
  value = 0,
  onMoveLeft,
  onMoveRight,
  onValueChange,
  maxLength,
}: KeyboardProps) => {
  const { resetValue, addDigit, toggleSign, removeDigit } =
    useKeyboard(onValueChange);

  const keyboardLayout = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "delete"],
  ];

  const handleKeyPress = (key: string) => {
    if (key === "delete") {
      removeDigit();
    } else {
      addDigit(Number(key), maxLength);
    }
  };

  useEffect(() => {
    resetValue(value);
  }, [value, resetValue]);

  return (
    <div className="fixed-container bottom-0 z-30 lg:fixed lg:left-64 lg:right-0">
      <div className="flex items-center justify-between py-2 bg-gray-100">
        <div className="flex ml-2">
          <Button
            color="white"
            className="rounded-l-full w-15 py-1 border-2 border-gray-300"
            onClick={onMoveLeft}
          >
            ←
          </Button>
          <Button
            color="white"
            className="rounded-r-full -ml-1 w-15 py-1 border-2 border-gray-300"
            onClick={onMoveRight}
          >
            →
          </Button>
        </div>
        <div className="flex mr-2 gap-2">
          <Button
            color="white"
            className="rounded-2xl w-15 border-2 py-1 border-gray-300"
            onClick={toggleSign}
          >
            + / -
          </Button>
          {/* 計算ボタンと閉じるボタンは親で制御 */}
          {children}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 bg-gray-200 p-2 pb-10">
        {keyboardLayout.map((row, index) =>
          row.map((key) => (
            <Button
              key={`${index}-${key}`}
              className={`${key === "" ? "invisible" : "white rounded-lg text-lg py-1 shadow-lg"}`}
              onClick={() => handleKeyPress(key)}
            >
              {key === "delete" ? "☒" : key}
            </Button>
          ))
        )}
      </div>
    </div>
  );
};

export default Keyboard;
