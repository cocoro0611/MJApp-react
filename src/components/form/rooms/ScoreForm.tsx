import Card from "@/src/components/ui/Card";
import type { ReadScore } from "@/src/lib/models/rooms/type";
import { Fragment } from "react";

interface ScoreFormProps {
  scores: ReadScore[];
  roomId: string;
  // 状態管理
  select?: { gameCount: number; playerIndex: number } | null;
  open: (gameCount: number, playerIndex: number) => void;
  getScore: (gameCount: number, playerIndex: number) => number;
  getRemainingScore: (gameCount: number) => number;
  isComplete: (gameCount: number) => boolean;
}

const ScoreForm = ({
  scores,
  roomId,
  select,
  open,
  getScore,
  getRemainingScore,
  isComplete,
}: ScoreFormProps) => {
  return (
    <>
      <div className="bg-gray-300 text-gray-600 grid-5">
        <div className="center font-bold">各スコア</div>
      </div>
      <div className="grid-5">
        {scores.map((gameScore) => {
          const complete = isComplete(gameScore.gameCount);
          const remainingScore = getRemainingScore(gameScore.gameCount);

          return (
            <Fragment key={gameScore.gameCount}>
              <div className="grid-5-inner">
                <div className="center flex-col p-1 h-18">
                  {complete ? (
                    <Card
                      href={`/rooms/${roomId}/scores/`}
                      className="w-full py-3"
                    >
                      {gameScore.gameCount}回戦
                    </Card>
                  ) : (
                    <div className="font-bold text-xs">
                      <p>-点数-</p>
                      <p className="text-red-500">あと</p>
                      <p className="text-red-500">{remainingScore}</p>
                    </div>
                  )}
                </div>
              </div>
              {gameScore.scores.map((scoreItem, index) => {
                // カードの選択チェック
                const isSelected =
                  select?.gameCount === gameScore.gameCount &&
                  select?.playerIndex === index;

                // スコアを取得
                const score = getScore(gameScore.gameCount, index);
                return (
                  <div className="grid-5-inner" key={index}>
                    <div className="center flex-col p-0.5 h-18">
                      <Card
                        isColor={!isSelected}
                        className={`w-full p-1
                        ${isSelected ? "pulse-effect" : ""} `}
                        onClick={() => open(gameScore.gameCount, index)}
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
          );
        })}
      </div>
    </>
  );
};

export default ScoreForm;
