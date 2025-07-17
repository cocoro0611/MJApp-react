"use client";

import { useState } from "react";
import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import ConcealedToggle from "@/src/template/calculation/ConcealedToggle";
import YonmaSanmaToggle from "@/src/template/calculation/yonmaSanmaToggle";
import CalculationBoard from "@/src/template/calculation/calculationBoard";
import HanConcealedList from "@/src/template/calculation/hanConcealedList";
import HanOpenList from "@/src/template/calculation/hanOpenList";
import { useCalculator } from "@/src/hooks/calculation/useCalculator";
import { HAN_CONCEALED_CONFIG } from "@/src/constants/calculation/han-concealed-config";
import { HAN_OPEN_CONFIG } from "@/src/constants/calculation/han-open-config";
import { getYonmaAllScores } from "@/src/utils/yonma-mahjong-calculation";
import { getSanmaAllScores } from "@/src/utils/sanma-mahjong-calculation";
import { useClickSound } from "@/src/hooks/sounds/useClickSound";
import CachedIcon from "@mui/icons-material/Cached";

const HanCalculationPage = () => {
  const [isConcealed, setIsConcealed] = useState(true); //門前/鳴きの切替
  const [isYonma, setIsYonma] = useState(true); // 四麻/三麻の切替
  const { playClick } = useClickSound();

  // 門前と鳴きの状態を別々に管理
  const concealedState = useCalculator(HAN_CONCEALED_CONFIG);
  const openState = useCalculator(HAN_OPEN_CONFIG);
  const currentState = isConcealed ? concealedState : openState;

  // 点数計算の関数
  const yonmaTokuten = getYonmaAllScores(
    currentState.totalHan,
    currentState.totalFu
  );

  const sanmaTokuten = getSanmaAllScores(
    currentState.totalHan,
    currentState.totalFu
  );

  const tokuten = isYonma ? yonmaTokuten : sanmaTokuten;

  return (
    <>
      <Header
        title={
          <div className="grid grid-cols-2 gap-4">
            <YonmaSanmaToggle isYonma={isYonma} setIsYonma={setIsYonma} />
            <ConcealedToggle
              isConcealed={isConcealed}
              setIsConcealed={setIsConcealed}
            />
          </div>
        }
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
            playClick();
            concealedState.resetButton();
            openState.resetButton();
          }}
        >
          <CachedIcon />
        </button>
      </Header>

      {/* extraの分の調整 */}
      <div className="pt-22" />

      <Content isBlank={false}>
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
