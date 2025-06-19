import Card from "@/src/components/ui/Card";
import { UserCard } from "../../Users";
import { ReadRoomDetailData } from "@/src/lib/models/rooms/type";

interface GameBoardProps {
  room: ReadRoomDetailData;
}

const GameBoard = ({ room }: GameBoardProps) => {
  return (
    <>
      <div className="fixed-container top-11 z-10 primary-color center grid-5">
        <div className="grid-5-inner">
          <div className="center p-0.5 bg-white">
            <Card className="w-full center flex-col h-16">
              <span>設定</span>
              <span>変更</span>
            </Card>
          </div>
          <div>スコア</div>
          <div>チップ</div>
          <div>収支</div>
        </div>
        {room.users.map((user) => (
          <div className="grid-5-inner" key={user.id}>
            <div className="center p-0.5 bg-white">
              <UserCard href="" name={user.name} icon={user.icon} size="mdWf" />
            </div>
            <div>{user.totalScore}</div>
            <div className="relative">
              {user.totalChip}
              <span className="absolute bottom-0 right-0.5 text-[0.6rem]">
                枚
              </span>
            </div>
            <div className="relative">
              {user.totalPoint}
              <span className="absolute bottom-0 right-0.5 text-[0.6rem]">
                P
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="pb-25.5"></div>
    </>
  );
};

export default GameBoard;
