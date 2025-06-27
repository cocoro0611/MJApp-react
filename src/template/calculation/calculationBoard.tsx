import { adjustFu } from "@/src/utils/mahjong-calculation";
import type { ScoreInfo } from "@/src/utils/mahjong-calculation";

interface CalculationBoardProps {
  totalHan: number;
  totalFu: number;
  tokuten: ScoreInfo;
}

const CalculationBoard = ({
  totalHan,
  totalFu,
  tokuten,
}: CalculationBoardProps) => {
  return (
    <div className="bg-white text-gray-800 font-bold text-sm center flex-col">
      <div className="flex justify-betweenl w-full text-primary-500">
        <div className="w-full">
          <div>{adjustFu(totalFu)} 符</div>
          {totalFu > 0 && <div className="text-xs">（{totalFu} 符）</div>}
        </div>
        <div className="center w-full">{totalHan} 翻</div>
      </div>
      <div className="w-full">
        {tokuten.coRon !== "null" && (
          <div className="text-xl">{tokuten.coRon} 点</div>
        )}
        <div>
          <span>親：</span>
          {tokuten.oyaRon !== "null" && <span>{tokuten.oyaRon}</span>}
          {tokuten.oyaTsumo !== "null" && <span>（{tokuten.oyaTsumo}）</span>}
        </div>
        <div>
          <span>子：</span>
          {tokuten.coRon !== "null" && <span>{tokuten.coRon}</span>}
          {tokuten.coTsumo !== "null" && <span>（{tokuten.coTsumo}）</span>}
        </div>
      </div>
    </div>
  );
};

export default CalculationBoard;
