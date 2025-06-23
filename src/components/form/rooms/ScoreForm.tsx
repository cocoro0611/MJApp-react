import Card from "@/src/components/ui/Card";
import type { ReadScore } from "@/src/lib/models/rooms/type";
import { Fragment } from "react";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

interface ScoreFormProps {
  scores: ReadScore[];
  initialPoint: number;
  roomId: string;
  // 状態管理
  selectedCard?: { gameCount: number; playerIndex: number } | null;
  onOpen: (gameCount: number, playerIndex: number) => void;
  getScore: (gameCount: number, playerIndex: number) => number;
}

const ScoreForm = ({
  scores,
  initialPoint,
  roomId,
  selectedCard,
  onOpen,
  getScore,
}: ScoreFormProps) => {
  const INITIAL_TOTAL_SCORE = initialPoint * MAX_ROOM_PLAYERS;

  return (
    <>
      <div className="bg-gray-300 text-gray-600 grid-5">
        <div className="center font-bold">各スコア</div>
      </div>
      <div className="grid-5">
        {scores.map((gameScore) => {
          const totalScore = gameScore.scores.reduce(
            (sum, scoreItem) => sum + scoreItem.score,
            0
          );
          const isComplete = totalScore === INITIAL_TOTAL_SCORE;

          return (
            <Fragment key={gameScore.gameCount}>
              <div className="grid-5-inner">
                <div className="center flex-col p-1 h-18">
                  {isComplete ? (
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
                      <p className="text-red-500">
                        {INITIAL_TOTAL_SCORE - totalScore}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {gameScore.scores.map((scoreItem, index) => {
                // カードの選択チェック
                const isCardSelected =
                  selectedCard?.gameCount === gameScore.gameCount &&
                  selectedCard?.playerIndex === index;

                // スコアを取得
                const displayScore = getScore(gameScore.gameCount, index);
                return (
                  <div className="grid-5-inner" key={index}>
                    <div className="center flex-col p-0.5 h-18">
                      <Card
                        isColor={!isCardSelected}
                        className={`w-full p-1
                        ${isCardSelected ? "pulse-effect" : ""} `}
                        onClick={() => onOpen(gameScore.gameCount, index)}
                      >
                        <p className="flex justify-start text-[0.6rem]">点数</p>
                        <p>
                          <span
                            className={`px-1 border-b-2 ${isCardSelected ? "pulse-border-b-color" : "border-b-color"}`}
                          >
                            {displayScore}
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
