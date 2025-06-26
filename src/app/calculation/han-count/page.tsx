"use client";

import { useState } from "react";
import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Button from "@/src/components/ui/Button";
import CalculationBoard from "@/src/template/calculation/calculationBoard";
import HanConcealedList from "@/src/template/calculation/hanConcealedList";
import HanOpenList from "@/src/template/calculation/hanOpenList";
import { useCalculator } from "@/src/hooks/calculation/useCalculator";
import { HAN_CONCEALED_CONFIG } from "@/src/constants/calculation/han-concealed-config";
import { HAN_OPEN_CONFIG } from "@/src/constants/calculation/han-open-config";
import { getAllScores } from "@/src/utils/mahjong-calculation";
import CachedIcon from "@mui/icons-material/Cached";

const HanCalculationPage = () => {
  const [isConcealed, setIsConcealed] = useState(true);

  // 門前と鳴きの状態を別々に管理
  const concealedState = useCalculator(HAN_CONCEALED_CONFIG);
  const openState = useCalculator(HAN_OPEN_CONFIG);
  const currentState = isConcealed ? concealedState : openState;

  const tokuten = getAllScores(currentState.totalHan, currentState.totalFu);

  return (
    <>
      <Header
        title="　"
        href="/calculation"
        addContent={
          <>
            <div
              className="fixed -mt-[2.3rem] setting-on rounded p-0.5
              xl:ml-[19rem] lg:ml-[11rem] md:ml-[8rem] sm:ml-[9rem] ml-[4rem]"
            >
              <Button
                onClick={() => setIsConcealed(true)}
                custom={true}
                className={`rounded-l px-4 font-bold
              ${isConcealed ? "setting-on" : "setting-off"}
            `}
              >
                門前
              </Button>
              <Button
                onClick={() => setIsConcealed(false)}
                custom={true}
                className={`rounded-r px-4 font-bold
              ${isConcealed ? "setting-off" : "setting-on"}
            `}
              >
                鳴き
              </Button>
            </div>
            <CalculationBoard
              totalHan={currentState.totalHan}
              totalFu={currentState.totalFu}
              tokuten={tokuten}
            />
          </>
        }
        bottomSpace="pb-40"
      >
        <button
          type="button"
          onClick={() => {
            concealedState.resetButton();
            openState.resetButton();
          }}
        >
          <CachedIcon />
        </button>
      </Header>
      <Main className="flex-col">
        {isConcealed ? (
          <HanConcealedList
            buttonCounts={concealedState.buttonCounts}
            totalHan={concealedState.totalHan}
            onButtonClick={concealedState.exclusiveButton}
          />
        ) : (
          <HanOpenList
            buttonCounts={openState.buttonCounts}
            totalHan={openState.totalHan}
            onButtonClick={openState.exclusiveButton}
          />
        )}
      </Main>
    </>
  );
};

export default HanCalculationPage;
