"use client";

import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import CalculationBoard from "@/src/template/calculation/calculationBoard";
import HanConcealedList from "@/src/template/calculation/hanConcealedList";
// import HanOpenList from "@/src/template/calculation/hanOpenList";
import { useCalculator } from "@/src/hooks/calculation/useCalculator";
import { HAN_CONCEALED_CONFIG } from "@/src/constants/calculation/han-concealed-config";
import { getAllScores } from "@/src/utils/mahjong-calculation";
import CachedIcon from "@mui/icons-material/Cached";

const HanCalculationPage = () => {
  const { buttonCounts, totalHan, totalFu, exclusiveButton, resetButton } =
    useCalculator(HAN_CONCEALED_CONFIG);

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
      >
        <button type="button" onClick={resetButton}>
          <CachedIcon />
        </button>
      </Header>
      <Main className="flex-col">
        <HanConcealedList
          buttonCounts={buttonCounts}
          totalHan={totalHan}
          onButtonClick={exclusiveButton}
        />
        {/* <HanOpenList
          buttonCounts={buttonCounts}
          totalHan={totalHan}
          onButtonClick={exclusiveButton}
        /> */}
      </Main>
    </>
  );
};

export default HanCalculationPage;
