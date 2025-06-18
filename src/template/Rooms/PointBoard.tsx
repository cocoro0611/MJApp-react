interface PointBoardProps {
  points: number[];
}

const PointBoard = ({ points }: PointBoardProps) => {
  if (points.includes(0)) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-300 text-gray-600 grid-5">
        <div className="center font-bold">場代割勘</div>
      </div>
      <div className="grid-5">
        <div className="grid-5-inner h-8"></div>
        {points.map((point, index) => (
          <div className="grid-5-inner" key={index}>
            <div className="font-bold text-red-500 h-8 center relative">
              -{point}
              <span className="absolute right-0.5">P</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PointBoard;
