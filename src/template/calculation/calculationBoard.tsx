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
    <div className="fixed-container top-11 z-10 center bg-white text-gray-800">
      <div className="center flex-col">
        <div>
          <span>翻: {totalHan}</span>
          <span>符: {totalFu}</span>
        </div>
        <div>
          <span>親ロン：{tokuten.oyaRon}</span>
          <span>親ツモ：{tokuten.oyaTsumo}</span>
          <span>子ロン；{tokuten.coRon}</span>
          <span>子ツモ：{tokuten.coTsumo}</span>
        </div>
      </div>
    </div>
  );
};

export default CalculationBoard;
