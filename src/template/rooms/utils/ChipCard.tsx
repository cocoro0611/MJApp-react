import Card from "@/src/components/ui/Card";
import type { SelectState, SelectType } from "@/src/hooks/rooms/useSelection";

interface ChipCardProps {
  gameCount: number;
  index: number;
  selected?: SelectState | null;
  onOpen: (gameCount: number, index: number, type: SelectType) => void;
  getChip: (gameCount: number, index: number) => number;
}

const ChipCard = ({
  gameCount,
  index,
  selected,
  onOpen,
  getChip,
}: ChipCardProps) => {
  const isSelectedChip =
    selected?.gameCount === gameCount &&
    selected?.index === index &&
    selected?.type === "chip";

  const chip = getChip(gameCount, index);
  const desplayChip = chip - 20;
  return (
    <>
      <Card
        leftBorder={!isSelectedChip ? "sm" : "none"}
        color={!isSelectedChip ? "primary-light" : "secondary"}
        className={`w-full px-1 py-2 
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
          desplayChip < 0 ? "text-negative" : "text-positive"
        }`}
      >
        {desplayChip >= 0 ? `+${desplayChip}` : desplayChip}
        <span className="absolute bottom-0 right-0.5 text-[0.6rem]">枚</span>
      </div>
    </>
  );
};

export default ChipCard;
