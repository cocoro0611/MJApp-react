import AmountHeadCard from "./utils/AmountHeadCard";
import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";
import Card from "@/src/components/ui/Card";

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
          <div className="center p-1 h-18">
            <AmountHeadCard roomId={roomId} amount={amount} />
          </div>
        </div>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="grid-5-inner">
            <div className="center flex-col p-0.5 h-18">
              <Card className="w-full px-1 py-4.5 relative">
                <span>-{pointPerPlayer}</span>
                <span className="absolute right-0.5">P</span>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AmountBoard;
