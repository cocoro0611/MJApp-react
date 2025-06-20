import Card from "@/src/components/ui/Card";
import type { ReadScoreData } from "@/src/lib/models/rooms/type";
import { Fragment } from "react";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

interface ScoreBoardProps {
  scores: ReadScoreData[];
  initialPoint: number;
  roomId: string;
}

const ScoreBoard = ({ scores, initialPoint, roomId }: ScoreBoardProps) => {
  const INITIAL_TOTAL_SCORE = initialPoint * MAX_ROOM_PLAYERS;

  return (
    <>
      <div className="bg-gray-300 text-gray-600 grid-5">
        <div className="center font-bold">各スコア{INITIAL_TOTAL_SCORE}</div>
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
              {gameScore.scores.map((scoreItem) => {
                // スコア結果の計算
                //FIXME: 計算式結果はサーバ側で計算
                const scoreResult = scoreItem.score / 1000;
                const isScorePositive = scoreResult < 0;

                return (
                  <div className="grid-5-inner" key={scoreItem.position}>
                    <div className="center flex-col p-0.5 h-18">
                      <Card className="w-full p-1">
                        <p className="flex justify-start text-[0.6rem]">点数</p>
                        <p>
                          <span className="px-1 border-b-2 border-blue-400">
                            {scoreItem.score / 100}
                          </span>
                          <span>00</span>
                        </p>
                      </Card>
                      <div
                        className={`font-bold center w-full mt-0.5
                        ${isScorePositive ? "text-red-500" : "text-blue-500"}`}
                      >
                        {scoreResult}
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

export default ScoreBoard;
