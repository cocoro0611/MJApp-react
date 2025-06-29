"use client";

import ButtonCount from "@/src/components/ui/ButtonCount";
import FormatButtonText from "./utils/formatButtonText";
import {
  HAN_OPEN_CONFIG,
  HAN_OPEN_GROUPS,
} from "@/src/constants/calculation/han-open-config";

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
      {HAN_OPEN_GROUPS.map(({ category, label }) => {
        const buttons = HAN_OPEN_CONFIG.filter(
          (config) => config.category === category
        );

        return (
          <div key={category} className="mb-4">
            <div className="flex justify-start font-bold mb-2">{label}</div>
            <div className="p-2 rounded-lg border-2 border-dotted border-primary-500 bg-primary-200">
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
          </div>
        );
      })}
    </>
  );
};

export default HanOpenList;
