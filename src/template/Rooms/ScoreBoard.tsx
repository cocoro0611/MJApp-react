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
    <div className="score-container room-container-border">
      {scores.map((gameScore) => (
        <Fragment key={gameScore.gameCount}>
          <div className="room-container-inner-border">
            <div className="center flex-col p-2 h-18">
              <Card href="" className="secondary card-border w-full p-3">
                {gameScore.gameCount}回戦
              </Card>
            </div>
          </div>
          {gameScore.scores.map((scoreItem) => (
            <div
              className="room-container-inner-border"
              key={scoreItem.position}
            >
              <div className="center flex-col p-0.5 h-18">
                <Card href="" className="secondary card-border w-full p-1">
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
  );
};

export default ScoreBoard;
