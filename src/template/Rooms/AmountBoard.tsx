import AmountHeadCard from "./utils/AmountHeadCard";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

interface AmountBoardProps {
  roomId: string;
  amount: number;
}

const AmountBoard = ({ roomId, amount }: AmountBoardProps) => {
  if (amount == 0) {
    return null;
  }

  const pointPerPlayer = amount / MAX_ROOM_PLAYERS;

  return (
    <>
      <div className="bg-gray-300 text-gray-600 font-bold grid-5">
        <div className="center">場代割勘</div>
      </div>
      <div className="grid-5 font-bold">
        <div className="grid-5-inner">
          <div className="center p-1 h-14">
            <AmountHeadCard roomId={roomId} amount={amount} />
          </div>
        </div>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="grid-5-inner">
            <div className="text-negative h-14 center relative">
              -{pointPerPlayer}
              <span className="absolute right-0.5">P</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AmountBoard;
