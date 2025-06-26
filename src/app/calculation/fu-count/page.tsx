"use client";

import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
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
        title="　"
        href="/calculation"
        addContent={
          <CalculationBoard
            totalHan={totalHan}
            totalFu={totalFu}
            tokuten={tokuten}
          />
        }
        bottomSpace="pb-40"
      >
        <button type="button" onClick={resetButton}>
          <CachedIcon />
        </button>
      </Header>
      <Main className="flex-col">
        <FuList
          buttonCounts={buttonCounts}
          totalHan={totalHan}
          onButtonClick={exclusiveButton}
        />
      </Main>
    </>
  );
};

export default FuCalculationPage;
