"use client";

import ButtonCount from "@/src/components/ui/ButtonCount";
import { FU_CONFIG, FU_GROUPS } from "@/src/constants/calculation/fu-config";

interface FuListProps {
  buttonCounts: number[];
  totalHan: number;
  onButtonClick: (index: number, count: number) => void;
}

const FuList = ({ buttonCounts, totalHan, onButtonClick }: FuListProps) => {
  // 門前ロンまたはツモが選択されているかチェック
  const isAgariSelected = (): boolean => {
    const ronIndex = FU_CONFIG.findIndex(
      (config) => config.label === "門前ロン"
    );
    const tsumoIndex = FU_CONFIG.findIndex((config) => config.label === "ツモ");

    return (
      (ronIndex >= 0 && buttonCounts[ronIndex] > 0) ||
      (tsumoIndex >= 0 && buttonCounts[tsumoIndex] > 0)
    );
  };

  // 表示するグループを決定
  const getVisibleGroups = () => {
    const agariSelected = isAgariSelected();

    if (agariSelected) {
      return FU_GROUPS;
    } else {
      return FU_GROUPS.filter((group) => group.category === "1-han");
    }
  };

  const visibleGroups = getVisibleGroups();

  return (
    <>
      {visibleGroups.map(({ category, label }) => {
        const buttons = FU_CONFIG.filter(
          (config) => config.category === category
        );

        return (
          <div key={category} className="mb-4">
            <div className="flex justify-start font-bold mb-2">{label}</div>
            <div className="grid grid-cols-4 gap-4">
              {buttons.map((buttonConfig) => {
                const originalIndex = FU_CONFIG.indexOf(buttonConfig);
                return (
                  <ButtonCount
                    key={originalIndex}
                    size="lg"
                    count={buttonConfig.count}
                    externalCount={buttonCounts[originalIndex]}
                    onClick={(count) => onButtonClick(originalIndex, count)}
                    group={buttonConfig.group}
                    totalHan={totalHan}
                  >
                    {buttonConfig.label}
                  </ButtonCount>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FuList;
