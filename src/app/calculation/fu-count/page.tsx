"use client";

import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import CalculationBoard from "@/src/template/calculation/calculationBoard";
import FuList from "@/src/template/calculation/fuList";
import { useCalculator } from "@/src/hooks/calculation/useCalculator";
import { FU_CONFIG } from "@/src/constants/calculation/fu-config";
import { getAllScores } from "@/src/utils/mahjong-calculation";
import CachedIcon from "@mui/icons-material/Cached";

const FuCalculationPage = () => {
  const { buttonCounts, totalHan, totalFu, exclusiveButton, resetButton } =
    useCalculator(FU_CONFIG);

  // 点数計算の関数
  const tokuten = getAllScores(totalHan, totalFu);

  return (
    <>
      <Header
        title="符数計算"
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
