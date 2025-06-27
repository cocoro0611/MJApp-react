import Card from "@/src/components/ui/Card";
import type { SelectState } from "@/src/hooks/rooms/useSelection";

interface ChipCardProps {
  gameCount: number;
  index: number;
  selected?: SelectState | null;
  roomChipRate: number;
  onOpen: (gameCount: number, index: number) => void;
  getChip: (gameCount: number, index: number) => number;
}

const ChipCard = ({
  gameCount,
  index,
  selected,
  roomChipRate,
  onOpen,
  getChip,
}: ChipCardProps) => {
  const isSelectedChip =
    selected?.gameCount === gameCount && selected?.index === index;

  const chip = getChip(gameCount, index);
  const chipPoint = (chip - 20) * roomChipRate;
  return (
    <>
      <Card
        isColor={!isSelectedChip}
        className={`w-full p-1 
            ${
              isSelectedChip
                ? "bg-accent-100 border-accent-400 text-accent-800 effect-pulse"
                : ""
            }`}
        onClick={() => onOpen(gameCount, index)}
      >
        <div className="flex text-[0.6rem]">枚数</div>
        <div>
          <span
            className={`px-1 border-b-2 ${
              isSelectedChip ? "border-accent-500" : "border-primary-300"
            }`}
          >
            {chip}
          </span>
          <span>枚</span>
        </div>
      </Card>
      <div
        className={`font-bold center w-full relative mt-0.5 ${
          chipPoint < 0 ? "text-negative" : "text-positive"
        }`}
      >
        {chipPoint}
        <span className="absolute right-0.5">P</span>
      </div>
    </>
  );
};

export default ChipCard;
