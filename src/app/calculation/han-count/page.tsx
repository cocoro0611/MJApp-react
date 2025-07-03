"use client";

import { useState } from "react";
import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import ConcealedToggle from "@/src/template/calculation/ConcealedToggle";
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
      {/* 一旦強引にヘッダーの上に置いている */}
      <ConcealedToggle
        isConcealed={isConcealed}
        setIsConcealed={setIsConcealed}
      />
      <Header
        title="　"
        href="/calculation"
        extra={
          <CalculationBoard
            totalHan={currentState.totalHan}
            totalFu={currentState.totalFu}
            tokuten={tokuten}
          />
        }
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
      <Content className="flex-col">
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
      </Content>
    </>
  );
};

export default HanCalculationPage;
