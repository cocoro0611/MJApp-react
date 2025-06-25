"use client";

import ButtonCount from "@/src/components/ui/ButtonCount";
import { FU_CONFIG, FU_GROUPS } from "@/src/constants/calculation/fu-config";
import FormatButtonText from "@/src/components/format/formatButtonText";

interface FuListProps {
  buttonCounts: number[];
  totalHan: number;
  onButtonClick: (index: number, count: number) => void;
}

const FuList = ({ buttonCounts, totalHan, onButtonClick }: FuListProps) => {
  return (
    <>
      {FU_GROUPS.map(({ han, label }) => {
        const buttons = FU_CONFIG.filter((config) => config.han === han);

        return (
          <div key={han} className="mb-4">
            <div className="flex justify-start font-bold mb-2">{label}</div>
            <div className="grid-6">
              {buttons.map((buttonConfig) => {
                const originalIndex = FU_CONFIG.indexOf(buttonConfig);
                return (
                  <ButtonCount
                    key={originalIndex}
                    count={buttonConfig.count}
                    externalCount={buttonCounts[originalIndex]}
                    onClick={(count) => onButtonClick(originalIndex, count)}
                    group={buttonConfig.group}
                    totalHan={totalHan}
                  >
                    {FormatButtonText(buttonConfig.label)}
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
