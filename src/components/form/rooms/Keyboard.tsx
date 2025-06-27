"use client";

import Button from "@/src/components/ui/Button";
import { useKeyboard } from "@/src/hooks/rooms/useKeyboard";
import { useEffect } from "react";
import type { SelectState } from "@/src/hooks/rooms/useSelection";

interface KeyboardProps {
  selected?: SelectState | null;
  onClose?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  value?: number;
  onValueChange?: (newValue: number) => void;
  isComplete: boolean;
  maxLength: number;
}

const Keyboard = ({
  selected,
  onClose,
  onMoveLeft,
  onMoveRight,
  value = 0,
  onValueChange,
  isComplete,
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
  }, [value, selected, resetValue]);

  return (
    <div className="fixed-container bottom-0 z-20">
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
        <div className="flex gap-2 mr-2">
          <Button
            color="white"
            className="rounded-2xl w-15 py-1 border-2 border-gray-300"
            onClick={toggleSign}
          >
            + / -
          </Button>
          <Button
            type="submit"
            disabled={!isComplete}
            className="rounded text-sm w-16 py-2"
          >
            計算
          </Button>
          <Button
            color="cancel"
            className="rounded text-sm w-16 py-1"
            onClick={onClose}
          >
            閉じる
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 bg-gray-200 p-2 pb-10">
        {keyboardLayout.map((row, index) =>
          row.map((key) => (
            <Button
              key={`${index}-${key}`}
              className={`${key === "" ? "invisible" : "white rounded-lg text-lg py-1 "}`}
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
