import { MAX_ROOM_PLAYERS } from "@/src/constants/gameRules";

interface AmountBoardProps {
  amount: number;
}

const AmountBoard = ({ amount }: AmountBoardProps) => {
  if (amount == 0) {
    return null;
  }

  const pointPerPlayer = amount / MAX_ROOM_PLAYERS;

  return (
    <>
      <div className="bg-gray-300 text-gray-600 grid-5">
        <div className="center font-bold ">場代割勘</div>
      </div>
      <div className="grid-5">
        <div className="grid-5-inner">
          <div className="h-8 center" />
        </div>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="grid-5-inner">
            <div className="font-bold text-red-500 h-8 center relative">
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
