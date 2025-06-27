import DataCard from "@/src/template/Rooms/DataCard";
import DeleteScoreDialog from "../../nav/DeleteScoreDialog";
import { Fragment } from "react";
import type { ReadScore } from "@/src/lib/models/rooms/type";
import type { SelectState, SelectType } from "@/src/hooks/rooms/useSelection";

interface ScoreBoardProps {
  scores: ReadScore[];
  roomId: string;
  // 状態管理
  selected?: SelectState | null;
  onOpen: (gameCount: number, index: number, type?: SelectType) => void;
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
        <div className="center">各スコア</div>
      </div>
      <div className="grid-5">
        {scores.map((gameScore) => (
          <Fragment key={gameScore.gameCount}>
            <div className="grid-5-inner">
              <div className="center flex-col p-1 h-18">
                <DeleteScoreDialog
                  roomId={roomId}
                  gameCount={gameScore.gameCount}
                  complete={isComplete(gameScore.gameCount)}
                  remaining={getRemaining(gameScore.gameCount)}
                />
              </div>
            </div>
            {gameScore.scores.map((scoreItem, index) => {
              const score = getScore(gameScore.gameCount, index);
              return (
                <div className="grid-5-inner" key={index}>
                  <div className="center flex-col p-0.5 h-18">
                    <DataCard
                      gameCount={gameScore.gameCount}
                      index={index}
                      data={score}
                      scoreResult={scoreItem.scoreResult}
                      selected={selected}
                      onOpen={onOpen}
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
