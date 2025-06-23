"use client";

import Form from "next/form";
import Button from "@/src/components/ui/Button";
import { useKeyboard } from "@/src/hooks/useKeyboard";
import { useEffect } from "react";

interface KeyboardProps {
  selectedCard?: { gameCount: number; playerIndex: number } | null;
  onClose?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  currentScore?: number;
  onScoreUpdate?: (updateScore: number) => void;
}

const Keyboard = ({
  selectedCard,
  onClose,
  onLeft,
  onRight,
  currentScore = 0,
  onScoreUpdate,
}: KeyboardProps) => {
  const { initScore, inputNumber, signNum, deleteNum } =
    useKeyboard(onScoreUpdate);

  const keyboardLayout = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "delete"],
  ];

  const handleKeyPress = (key: string) => {
    if (key === "delete") {
      deleteNum();
    } else {
      inputNumber(Number(key));
    }
  };

  useEffect(() => {
    initScore(currentScore);
  }, [currentScore, selectedCard, initScore]);

  return (
    <div className="fixed-container bottom-0 z-20">
      <div className="flex items-center justify-between py-2 bg-gray-100">
        <div className="flex ml-2">
          <Button
            onClick={onLeft}
            type="button"
            color="white"
            custom={true}
            className="rounded-l-full w-15 py-1 border-2 border-gray-300"
          >
            ←
          </Button>
          <Button
            onClick={onRight}
            type="button"
            color="white"
            custom={true}
            className="rounded-r-full -ml-1 w-15 py-1 border-2 border-gray-300"
          >
            →
          </Button>
        </div>
        <div className="flex gap-2 mr-2">
          <Button
            onClick={signNum}
            type="button"
            color="white"
            custom={true}
            className="rounded-2xl w-15 py-1 border-2 border-gray-300"
          >
            + / -
          </Button>
          <Form action="">
            <input type="hidden" name="" value="" />
            <Button custom={true} className="rounded text-sm w-16 py-2 ">
              計算
            </Button>
          </Form>
          <Button
            onClick={onClose}
            color="cancel"
            type="button"
            custom={true}
            className="rounded text-sm w-16 py-1"
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
              type="button"
              custom={true}
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
