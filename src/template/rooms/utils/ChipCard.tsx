import Card from "@/src/components/ui/Card";
import type { SelectState, SelectType } from "@/src/hooks/rooms/useSelection";

interface ChipCardProps {
  gameCount: number;
  index: number;
  selected?: SelectState | null;
  roomChipRate: number;
  onOpen: (gameCount: number, index: number, type: SelectType) => void;
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
    selected?.gameCount === gameCount &&
    selected?.index === index &&
    selected?.type === "chip";

  const chip = getChip(gameCount, index);
  const chipPoint = (chip - 20) * roomChipRate;
  return (
    <>
      <Card
        leftBorder={!isSelectedChip ? "sm" : "none"}
        color={!isSelectedChip ? "primary-light" : "secondary"}
        className={`w-full p-1 
        ${!isSelectedChip ? "" : "effect-pulse border-l-3 border-secondary-400"}`}
        onClick={() => onOpen(gameCount, index, "chip")}
      >
        <div className="flex text-[0.6rem]">枚数</div>
        <div>
          <span
            className={`px-1 border-b-2 ${
              isSelectedChip ? "border-secondary-500" : "border-primary-300"
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
