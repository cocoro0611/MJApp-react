"use client";

import ButtonCount from "@/src/components/ui/ButtonCount";
import {
  HAN_OPEN_CONFIG,
  HAN_OPEN_GROUPS,
} from "@/src/constants/calculation/han-open-config";
import FormatButtonText from "@/src/components/format/formatButtonText";

interface HanOpenListProps {
  buttonCounts: number[];
  totalHan: number;
  onButtonClick: (index: number, count: number) => void;
}

const HanOpenList = ({
  buttonCounts,
  totalHan,
  onButtonClick,
}: HanOpenListProps) => {
  return (
    <>
      {HAN_OPEN_GROUPS.map(({ han, label }) => {
        const buttons = HAN_OPEN_CONFIG.filter((config) => config.han === han);

        return (
          <div key={han} className="mb-4">
            <div className="flex justify-start font-bold mb-2">{label}</div>
            <div className="grid-6">
              {buttons.map((buttonConfig) => {
                const originalIndex = HAN_OPEN_CONFIG.indexOf(buttonConfig);
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

export default HanOpenList;
