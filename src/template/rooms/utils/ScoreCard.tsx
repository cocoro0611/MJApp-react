import Card from "@/src/components/ui/Card";
import type { SelectState, SelectType } from "@/src/hooks/rooms/useSelection";

interface ScoreCardProps {
  gameCount: number;
  index: number;
  selected?: SelectState | null;
  scoreResult: number;
  onOpen: (gameCount: number, index: number, type: SelectType) => void;
  getScore: (gameCount: number, index: number) => number;
}

const ScoreCard = ({
  gameCount,
  index,
  scoreResult,
  selected,
  onOpen,
  getScore,
}: ScoreCardProps) => {
  const isSelectedScore =
    selected?.gameCount === gameCount &&
    selected?.index === index &&
    selected?.type === "score";

  const score = getScore(gameCount, index);

  return (
    <>
      <Card
        leftBorder={!isSelectedScore ? "sm" : "none"}
        color={!isSelectedScore ? "primary-light" : "secondary"}
        className={`w-full px-1 py-2 
        ${!isSelectedScore ? "" : "effect-pulse border-l-3 border-secondary-400"}`}
        onClick={() => onOpen(gameCount, index, "score")}
      >
        <div className="flex text-[0.6rem]">点数</div>
        <div>
          <span
            className={`px-1 border-b-2 ${
              isSelectedScore ? "border-secondary-500" : "border-primary-300"
            }`}
          >
            {score}
          </span>
          <span>00</span>
        </div>
      </Card>
      <div
        className={`font-bold center w-full mt-0.5 ${
          scoreResult < 0 ? "text-negative" : "text-positive"
        }`}
      >
        {scoreResult >= 0 ? `+${scoreResult}` : scoreResult}
      </div>
    </>
  );
};

export default ScoreCard;
