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
  onScoreUpdate?: (newScore: number) => void;
}

const Keyboard = ({
  selectedCard,
  onClose,
  onLeft,
  onRight,
  currentScore = 0,
  onScoreUpdate,
}: KeyboardProps) => {
  const { display, inputNumber, signNum, deleteNum, setDisplay } =
    useKeyboard();

  // カードが変更された時にキーボードの表示を更新
  useEffect(() => {
    if (currentScore) {
      setDisplay(String(currentScore / 100));
    }
  }, [currentScore, selectedCard, setDisplay]);

  // キーボード入力時にスコアを更新する関数を作成
  const handleInputNumber = (num: string) => {
    inputNumber(num); // 元の関数を実行

    // 新しい表示値を計算
    const currentDisplay = display === "0" ? num : display + num;
    const newScore = Number(currentDisplay) * 100;

    // スコアを更新
    if (onScoreUpdate) {
      onScoreUpdate(newScore);
    }
  };

  const handleSignNum = () => {
    signNum(); // 元の関数を実行

    // 符号変更後の値を計算
    let newDisplay;
    if (display === "0") return;

    if (display.startsWith("-")) {
      newDisplay = display.slice(1);
    } else {
      newDisplay = "-" + display;
    }

    const newScore = Number(newDisplay) * 100;

    if (onScoreUpdate) {
      onScoreUpdate(newScore);
    }
  };

  const handleDeleteNum = () => {
    deleteNum(); // 元の関数を実行

    // 削除後の値を計算
    let newDisplay;
    if (display.length > 1) {
      newDisplay = display.slice(0, -1);
    } else {
      newDisplay = "0";
    }

    const newScore = Number(newDisplay) * 100;

    if (onScoreUpdate) {
      onScoreUpdate(newScore);
    }
  };

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
            onClick={handleSignNum}
            type="button"
            color="white"
            custom={true}
            className="rounded-2xl w-15 py-1 border-2 border-gray-300"
          >
            + / -
          </Button>
          <Form action="">
            <input type="hidden" name="hogehoge" value="hogehoge" />
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
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => handleInputNumber("1")}
          >
            1
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => handleInputNumber("4")}
          >
            4
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => handleInputNumber("7")}
          >
            7
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => handleInputNumber("2")}
          >
            2
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => handleInputNumber("5")}
          >
            5
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => handleInputNumber("8")}
          >
            8
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => handleInputNumber("0")}
          >
            0
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => handleInputNumber("3")}
          >
            3
          </Button>
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => handleInputNumber("6")}
          >
            6
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => handleInputNumber("9")}
          >
            9
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={handleDeleteNum}
          >
            ☒
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
