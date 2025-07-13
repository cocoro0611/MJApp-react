import ScoreCard from "./ScoreCard";
import ScoreHeadCard from "./ScoreHeadCard";
import { Fragment } from "react";
import type { ReadScore } from "@/src/lib/models/rooms/type";
import type { SelectState, SelectType } from "@/src/hooks/rooms/useSelection";

interface ScoreBoardProps {
  scores: ReadScore[];
  roomId: string;
  // 状態管理
  selected?: SelectState | null;
  onOpen: (gameCount: number, index: number, type: SelectType) => void;
  getScore: (gameCount: number, index: number) => number;
  getRemaining: (gameCount: number) => number;
  isComplete: (gameCount: number) => boolean;
}

const ScoreBoard = ({
  scores,
  roomId,
  selected,
  onOpen,
  getScore,
  getRemaining,
  isComplete,
}: ScoreBoardProps) => {
  return (
    <>
      <div className="bg-gray-300 text-gray-600 font-bold grid-5">
        <div className="center">スコア</div>
      </div>
      <div className="grid-5">
        {scores.map((gameScore) => (
          <Fragment key={gameScore.gameCount}>
            <div className="grid-5-inner">
              <div className="center flex-col p-1 h-20">
                <ScoreHeadCard
                  roomId={roomId}
                  gameCount={gameScore.gameCount}
                  remaining={getRemaining(gameScore.gameCount)}
                  complete={isComplete(gameScore.gameCount)}
                />
              </div>
            </div>
            {gameScore.scores.map((scoreItem, index) => {
              return (
                <div className="grid-5-inner" key={index}>
                  <div className="center flex-col p-0.5 h-20">
                    <ScoreCard
                      gameCount={gameScore.gameCount}
                      index={index}
                      scoreResult={scoreItem.scoreResult}
                      selected={selected}
                      onOpen={onOpen}
                      getScore={getScore}
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

export default ScoreBoard;
