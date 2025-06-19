"use client";

import Form from "next/form";
import Button from "@/src/components/ui/Button";
import { useInputBoard } from "@/src/hooks/useInputBoard";

interface InputBoardProps {
  onCalculate?: (value: number) => void;
  onClose?: () => void;
  selectedPlayer?: string;
}

const InputBoard = ({ onClose, selectedPlayer }: InputBoardProps) => {
  const { display, inputNumber, left, right, signNum, deleteNum } =
    useInputBoard();

  return (
    <div className="fixed-container bottom-0 z-30">
      {selectedPlayer && <div>選択中: {selectedPlayer}</div>}
      <div>{display}</div>

      <div className="flex items-center justify-between py-2 bg-gray-100">
        <div className="flex ml-2">
          <Button
            onClick={left}
            type="button"
            color="white"
            custom={true}
            className="rounded-l-full w-15 py-1 border-2 border-gray-300"
          >
            ←
          </Button>
          <Button
            onClick={right}
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
            onClick={() => inputNumber("1")}
          >
            1
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => inputNumber("4")}
          >
            4
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => inputNumber("7")}
          >
            7
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => inputNumber("2")}
          >
            2
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => inputNumber("5")}
          >
            5
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => inputNumber("8")}
          >
            8
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => inputNumber("0")}
          >
            0
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => inputNumber("3")}
          >
            3
          </Button>
          <Button
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => inputNumber("6")}
          >
            6
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={() => inputNumber("9")}
          >
            9
          </Button>
          <Button
            type="button"
            custom={true}
            className="white rounded-lg text-lg py-1"
            onClick={deleteNum}
          >
            ☒
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputBoard;
