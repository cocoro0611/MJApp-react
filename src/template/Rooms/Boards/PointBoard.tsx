import type { ReadRoomData } from "@/src/lib/models/rooms/type";

interface PointBoardProps {
  room: ReadRoomData;
}

const PointBoard = ({ room }: PointBoardProps) => {
  if (room.gameAmount == 0) {
    return null;
  }

  const pointPerPlayer = room.gameAmount / 4;

  return (
    <>
      <div className="bg-gray-300 text-gray-600 grid-5">
        <div className="center font-bold">場代割勘</div>
      </div>
      <div className="grid-5">
        <div className="grid-5-inner h-8"></div>
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

export default PointBoard;
