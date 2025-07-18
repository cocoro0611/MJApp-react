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
                  const originalIndex = HAN_OPEN_CONFIG.indexOf(buttonConfig);
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

export default HanOpenList;
