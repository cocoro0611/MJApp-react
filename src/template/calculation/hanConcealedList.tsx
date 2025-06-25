"use client";

import ButtonCount from "@/src/components/ui/ButtonCount";
import {
  HAN_CONCEALED_CONFIG,
  HAN_CONCEALED_GROUPS,
} from "@/src/constants/calculation/han-concealed-config";
import FormatButtonText from "@/src/components/format/formatButtonText";

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
      {HAN_CONCEALED_GROUPS.map(({ han, label }) => {
        const buttons = HAN_CONCEALED_CONFIG.filter(
          (config) => config.han === han
        );

        return (
          <div key={han} className="mb-4">
            <div className="flex justify-start font-bold mb-2">{label}</div>
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
        );
      })}
    </>
  );
};

export default HanConcealedList;
