"use client";

import { useState } from "react";
import Button from "@/src/components/ui/Button";

interface InputBoardProps {
  onCalculate?: (value: number) => void;
  onClose?: () => void;
  selectedPlayer?: string;
}

const InputBoard = ({
  onCalculate,
  onClose,
  selectedPlayer,
}: InputBoardProps) => {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<"+" | "-" | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [waitingForValue, setWaitingForValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForValue) {
      setDisplay(num);
      setWaitingForValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: "+" | "-") => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForValue(true);
    setOperation(nextOperation);
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: "+" | "-"
  ) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    let result = inputValue;

    if (operation && previousValue !== null) {
      result = calculate(previousValue, inputValue, operation);
    }

    onCalculate?.(result);

    // リセット
    setDisplay("0");
    setOperation(null);
    setPreviousValue(null);
    setWaitingForValue(false);
  };

  const clear = () => {
    setDisplay("0");
    setOperation(null);
    setPreviousValue(null);
    setWaitingForValue(false);
  };

  const deleteLastDigit = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const toggleSign = () => {
    if (operation === "+") {
      setOperation("-");
    } else if (operation === "-") {
      setOperation("+");
    } else {
      inputOperation(display.startsWith("-") ? "+" : "-");
    }
  };

  return (
    <div className="fixed-container bottom-0 z-20">
      {/* <div className="bg-white p-4 rounded-lg mb-4 shadow-sm">
        {selectedPlayer && (
          <div className="text-sm text-gray-600 mb-2">
            選択中: {selectedPlayer}
          </div>
        )}
        <div className="text-right">
          <div className="text-3xl font-mono font-bold text-gray-800">
            {display}
          </div>
          {operation && (
            <div className="text-lg text-blue-600">{operation} 待機中...</div>
          )}
        </div>
      </div> */}

      <div className="flex items-center justify-between py-2 bg-gray-100 ">
        <div className="flex gap-2 ml-2">
          <Button onClick={clear}>←</Button>
          <Button onClick={clear}>→</Button>
        </div>
        <div className="flex gap-2 mr-2">
          <Button onClick={toggleSign}>+/-</Button>
          <Button custom={true} onClick={performCalculation}>
            計算
          </Button>
          <Button color="cancel" onClick={onClose}>
            閉じる
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-gray-200 p-2 pb-10">
        <div className="flex flex-col gap-2">
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={() => inputNumber("1")}
          >
            1
          </Button>
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={() => inputNumber("4")}
          >
            4
          </Button>
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={() => inputNumber("7")}
          >
            7
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={() => inputNumber("2")}
          >
            2
          </Button>
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={() => inputNumber("5")}
          >
            5
          </Button>
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={() => inputNumber("8")}
          >
            8
          </Button>
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={() => inputNumber("0")}
          >
            0
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={() => inputNumber("3")}
          >
            3
          </Button>
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={() => inputNumber("6")}
          >
            6
          </Button>
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={() => inputNumber("9")}
          >
            9
          </Button>
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1.5"
            onClick={deleteLastDigit}
          >
            ☒
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputBoard;
