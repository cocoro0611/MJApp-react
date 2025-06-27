import ChipCard from "./ChipCard";
import ChipHeadCard from "./ChipHeadCard";
import { Fragment } from "react";
import type { ReadChip } from "@/src/lib/models/rooms/type";
import type { SelectState, SelectType } from "@/src/hooks/rooms/useSelection";

interface ChipBoardProps {
  chips: ReadChip[];
  roomId: string;
  roomChipRate: number;
  // 状態管理
  selected?: SelectState | null;
  onOpen: (gameCount: number, index: number, type?: SelectType) => void;
  getChip: (gameCount: number, index: number) => number;
  getRemaining: (gameCount: number) => number;
  isComplete: (gameCount: number) => boolean;
}

const ChipBoard = ({
  chips,
  roomId,
  roomChipRate,
  selected,
  onOpen,
  getChip,
  getRemaining,
  isComplete,
}: ChipBoardProps) => {
  return (
    <>
      <div className="bg-gray-300 text-gray-600 font-bold grid-5">
        <div className="center">各チップ</div>
      </div>
      <div className="grid-5">
        {chips.map((gameChip) => (
          <Fragment key={gameChip.gameCount}>
            <div className="grid-5-inner">
              <div className="center flex-col p-1 h-18">
                <ChipHeadCard
                  roomId={roomId}
                  gameCount={gameChip.gameCount}
                  remaining={getRemaining(gameChip.gameCount)}
                  complete={isComplete(gameChip.gameCount)}
                />
              </div>
            </div>
            {gameChip.chips.map((chipItem, index) => {
              return (
                <div className="grid-5-inner" key={index}>
                  <div className="center flex-col p-0.5 h-18">
                    <ChipCard
                      gameCount={gameChip.gameCount}
                      index={index}
                      selected={selected}
                      roomChipRate={roomChipRate}
                      onOpen={onOpen}
                      getChip={getChip}
                    />
                  </div>
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default ChipBoard;
