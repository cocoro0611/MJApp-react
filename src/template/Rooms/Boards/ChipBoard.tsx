import Card from "@/src/components/ui/Card";
import { Fragment } from "react";

interface ChipItem {
  position: number;
  chip: number;
}

interface GameChip {
  gameCount: number;
  chips: ChipItem[];
}

interface ChipBoardProps {
  chips: GameChip[];
}

const ChipBoard = ({ chips }: ChipBoardProps) => {
  if (!chips || chips.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-300 text-gray-600 grid-5">
        <div className="center font-bold">各チップ</div>
      </div>
      <div className="grid-5">
        {chips.map((gameChip) => (
          <Fragment key={gameChip.gameCount}>
            <div className="grid-5-inner">
              <div className="center flex-col p-1 h-18">
                <Card href="" className="secondary card-border w-full py-1.5">
                  {gameChip.gameCount}回分
                  <div className="text-[0.6rem]">(1人/20枚)</div>
                </Card>
              </div>
            </div>
            {gameChip.chips.map((chipItem) => (
              <div className="grid-5-inner" key={chipItem.position}>
                <div className="center flex-col p-0.5 h-18">
                  <Card href="" className="secondary card-border w-full p-1">
                    <p className="flex justify-start text-[0.6rem]">点数</p>
                    <p>
                      <span className="px-1 border-b-2 border-blue-400">
                        {chipItem.chip}
                      </span>
                      <span>00</span>
                    </p>
                  </Card>
                  <div className="font-bold text-blue-500">12</div>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default ChipBoard;
