import Card from "@/src/components/ui/Card";
import type { ReadChipData } from "@/src/lib/models/rooms/type";
import { Fragment } from "react";

interface ChipBoardProps {
  chips: ReadChipData[];
  chipRate: number;
  roomId: string;
}

const ChipBoard = ({ chips, chipRate, roomId }: ChipBoardProps) => {
  const INITIAL_TOTAL_CHIP = 80;
  const INITIAL_CHIP = 20;

  if (!chips || chips.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-300 text-gray-600 grid-5">
        <div className="center font-bold">各チップ</div>
      </div>
      <div className="grid-5">
        {chips.map((gameChip) => {
          const totalChips = gameChip.chips.reduce(
            (sum, chipItem) => sum + chipItem.chip,
            0
          );
          const isComplete = totalChips === INITIAL_TOTAL_CHIP;

          return (
            <Fragment key={gameChip.gameCount}>
              <div className="grid-5-inner">
                <div className="center flex-col p-1 h-18">
                  {isComplete ? (
                    <Card
                      href={`/rooms/${roomId}/chips/`}
                      className="w-full py-1.5"
                    >
                      {gameChip.gameCount}回分
                      <div className="text-[0.6rem]">(1人/20枚)</div>
                    </Card>
                  ) : (
                    <div className="font-bold text-xs">
                      <p>-チップ-</p>
                      <p className="text-red-500">あと</p>
                      <p className="text-red-500">
                        {INITIAL_TOTAL_CHIP - totalChips} 枚
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {gameChip.chips.map((chipItem) => {
                // チップポイントの計算
                const chipPoint = (chipItem.chip - INITIAL_CHIP) * chipRate;
                const isChipPositive = chipPoint < 0;

                return (
                  <div className="grid-5-inner" key={chipItem.position}>
                    <div className="center flex-col p-0.5 h-18">
                      <Card href="" className="w-full p-1">
                        <p className="flex justify-start text-[0.6rem]">枚数</p>
                        <p>
                          <span className="px-1 border-b-2 border-blue-400">
                            {chipItem.chip}
                          </span>
                          <span>枚</span>
                        </p>
                      </Card>
                      <div
                        className={`font-bold center w-full relative mt-0.5
                        ${isChipPositive ? "text-red-500" : "text-blue-500"}`}
                      >
                        {chipPoint}
                        <span className="absolute right-0.5">P</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default ChipBoard;
