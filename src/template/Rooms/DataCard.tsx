import Card from "@/src/components/ui/Card";
import type { SelectState } from "@/src/hooks/rooms/useSelection";

interface DataCardProps {
  gameCount: number;
  index: number;
  selected?: SelectState | null;
  data: number;
  scoreResult: number;
  onOpen: (gameCount: number, index: number) => void;
}

const DataCard = ({
  gameCount,
  index,
  data,
  scoreResult,
  selected,
  onOpen,
}: DataCardProps) => {
  const isSelectedScore =
    selected?.gameCount === gameCount &&
    selected?.index === index &&
    selected?.type === "score";

  const isSelectedChip =
    selected?.gameCount === gameCount &&
    selected?.index === index &&
    selected?.type === "chip";

  return (
    <>
      <Card
        isColor={!isSelectedScore}
        className={`w-full p-1 
            ${
              isSelectedScore
                ? "bg-accent-100 border-accent-400 text-accent-800 effect-pulse"
                : ""
            }`}
        onClick={() => onOpen(gameCount, index)}
      >
        <div className="flex text-[0.6rem]">点数</div>
        <div>
          <span
            className={`px-1 border-b-2 ${
              isSelectedScore ? "border-accent-500" : "border-primary-300"
            }`}
          >
            {data}
          </span>
          <span>00</span>
        </div>
      </Card>
      <div
        className={`font-bold center w-full mt-0.5 ${
          scoreResult < 0 ? "text-negative" : "text-positive"
        }`}
      >
        {scoreResult}
      </div>
    </>
  );
};

export default DataCard;
