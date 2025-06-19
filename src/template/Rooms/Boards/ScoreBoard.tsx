import Card from "@/src/components/ui/Card";
import { Fragment } from "react";

interface ScoreItem {
  position: number;
  score: number;
}

interface GameScore {
  gameCount: number;
  scores: ScoreItem[];
}

interface ScoreBoardProps {
  scores: GameScore[];
}

const ScoreBoard = ({ scores }: ScoreBoardProps) => {
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
                <Card href="" className="w-full py-3">
                  {gameScore.gameCount}回戦
                </Card>
              </div>
            </div>
            {gameScore.scores.map((scoreItem) => (
              <div className="grid-5-inner" key={scoreItem.position}>
                <div className="center flex-col p-0.5 h-18">
                  <Card href="" className="w-full p-1">
                    <p className="flex justify-start text-[0.6rem]">点数</p>
                    <p>
                      <span className="px-1 border-b-2 border-blue-400">
                        {scoreItem.score}
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

export default ScoreBoard;
