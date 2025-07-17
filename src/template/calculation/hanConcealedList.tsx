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
          <div key={category} className="mb-4 w-92 lg:w-150 mx-auto">
            <div className="flex justify-start font-bold mb-2">
              <span>{label}</span>
              <span className="ml-2 px-2 my-1 center text-[0.6rem] rounded-2xl text-white bg-primary-800">
                複数選択可
              </span>
            </div>
            <div className="p-1.5 rounded border border-dashed border-primary-500 bg-primary-100">
              <div className="grid-6 gap-1.5">
                {buttons.map((buttonConfig) => {
                  const originalIndex =
                    HAN_CONCEALED_CONFIG.indexOf(buttonConfig);
                  return (
                    <div className="center" key={originalIndex}>
                      <ButtonCount
                        count={buttonConfig.count}
                        externalCount={buttonCounts[originalIndex]}
                        onClick={(count) => onButtonClick(originalIndex, count)}
                        group={buttonConfig.group}
                        totalHan={totalHan}
                      >
                        {FormatButtonText(buttonConfig.label)}
                      </ButtonCount>
                    </div>
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
