"use client";

import ButtonCount from "@/src/components/ui/ButtonCount";
import FormatButtonText from "./utils/formatButtonText";
import {
  HAN_CONCEALED_CONFIG,
  HAN_CONCEALED_GROUPS,
} from "@/src/constants/calculation/han-concealed-config";

interface HanConcealedListProps {
  buttonCounts: number[];
  totalHan: number;
  onButtonClick: (index: number, count: number) => void;
}

const HanConcealedList = ({
  buttonCounts,
  totalHan,
  onButtonClick,
}: HanConcealedListProps) => {
  return (
    <>
      {HAN_CONCEALED_GROUPS.map(({ category, label }) => {
        const buttons = HAN_CONCEALED_CONFIG.filter(
          (config) => config.category === category
        );

        return (
          <div key={category} className="mb-4">
            <div className="flex justify-start font-bold mb-2">{label}</div>
            <div className="p-2 rounded-lg border border-dotted border-primary-500 bg-primary-200">
              <div className="grid-6">
                {buttons.map((buttonConfig) => {
                  const originalIndex =
                    HAN_CONCEALED_CONFIG.indexOf(buttonConfig);
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

export default HanConcealedList;
