"use client";

import { useState } from "react";
import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import YonmaSanmaToggle from "@/src/template/calculation/yonmaSanmaToggle";
import CalculationBoard from "@/src/template/calculation/calculationBoard";
import FuList from "@/src/template/calculation/fuList";
import { useCalculator } from "@/src/hooks/calculation/useCalculator";
import { FU_CONFIG } from "@/src/constants/calculation/fu-config";
import { getYonmaAllScores } from "@/src/utils/yonma-mahjong-calculation";
import { getSanmaAllScores } from "@/src/utils/sanma-mahjong-calculation";
import CachedIcon from "@mui/icons-material/Cached";

const FuCalculationPage = () => {
  const [isYonma, setIsYonma] = useState(true); // 四麻/三麻の切替

  const { buttonCounts, totalHan, totalFu, exclusiveButton, resetButton } =
    useCalculator(FU_CONFIG);

  // 点数計算の関数
  const yonmaTokuten = getYonmaAllScores(totalHan, totalFu);
  const sanmaTokuten = getSanmaAllScores(totalHan, totalFu);
  const tokuten = isYonma ? yonmaTokuten : sanmaTokuten;
  return (
    <>
      <Header
        title={
          <div className="grid-2 gap-4">
            <YonmaSanmaToggle isYonma={isYonma} setIsYonma={setIsYonma} />
            <div></div>
          </div>
        }
        href="/calculation"
        extra={
          <CalculationBoard
            totalHan={totalHan}
            totalFu={totalFu}
            tokuten={tokuten}
          />
        }
      >
        <button type="button" onClick={resetButton}>
          <CachedIcon />
        </button>
      </Header>

      {/* extraの分の調整 */}
      <div className="pt-22" />

      <Content>
        <FuList
          buttonCounts={buttonCounts}
          totalHan={totalHan}
          onButtonClick={exclusiveButton}
        />
      </Content>
    </>
  );
};

export default FuCalculationPage;
