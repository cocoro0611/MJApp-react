import Card from "@/src/components/ui/Card";
import DeleteCardDialog from "../../nav/DeleteCardDialog";
import { Fragment } from "react";
import type { ReadScore } from "@/src/lib/models/rooms/type";
import type { SelectState, SelectType } from "@/src/hooks/rooms/useSelection";

interface ScoreFormProps {
  scores: ReadScore[];
  roomId: string;
  // 状態管理
  selected?: SelectState | null;
  onOpen: (gameCount: number, index: number, type?: SelectType) => void;
  getScore: (gameCount: number, index: number) => number;
  getRemaining: (gameCount: number) => number;
  isComplete: (gameCount: number) => boolean;
}

const ScoreForm = ({
  scores,
  roomId,
  selected,
  onOpen,
  getScore,
  getRemaining,
  isComplete,
}: ScoreFormProps) => {
  return (
    <>
      <div className="bg-gray-300 text-gray-600 grid-5">
        <div className="center font-bold">各スコア</div>
      </div>
      <div className="grid-5">
        {scores.map((gameScore) => (
          <Fragment key={gameScore.gameCount}>
            <div className="grid-5-inner">
              <div className="center flex-col p-1 h-18">
                <DeleteCardDialog
                  complete={isComplete(gameScore.gameCount)}
                  roomId={roomId}
                  gameCount={gameScore.gameCount}
                  remainingScore={getRemaining(gameScore.gameCount)}
                />
              </div>
            </div>
            {gameScore.scores.map((scoreItem, index) => {
              // カードの選択チェック
              const isSelected =
                selected?.gameCount === gameScore.gameCount &&
                selected?.index === index &&
                selected?.type === "score";

              // スコアを取得
              const score = getScore(gameScore.gameCount, index);
              return (
                <div className="grid-5-inner" key={index}>
                  <div className="center flex-col p-0.5 h-18">
                    <Card
                      isColor={!isSelected}
                      className={`w-full p-1
                        ${isSelected ? "pulse-effect" : ""} `}
                      onClick={() => onOpen(gameScore.gameCount, index)}
                    >
                      <p className="flex justify-start text-[0.6rem]">点数</p>
                      <p>
                        <span
                          className={`px-1 border-b-2 ${isSelected ? "pulse-border-b-color" : "border-b-color"}`}
                        >
                          {score}
                        </span>
                        <span>00</span>
                      </p>
                    </Card>
                    <div
                      className={`font-bold center w-full mt-0.5
                        ${scoreItem.scoreResult < 0 ? "text-red-500" : "text-blue-500"}`}
                    >
                      {scoreItem.scoreResult}
                    </div>
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

export default ScoreForm;
