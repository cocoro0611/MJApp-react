import Card from "@/src/components/ui/Card";
import UserCard from "../users/UserCard";
import { ReadRoomDetailUser } from "@/src/lib/models/rooms/type";

interface GameBoardProps {
  roomDetailUser: ReadRoomDetailUser[];
  roomId: string;
}

const GameBoard = ({ roomDetailUser, roomId }: GameBoardProps) => {
  return (
    <>
      <div className="grid-5 center">
        <div className="grid-5-inner">
          <div className="center p-0.5 bg-white">
            <Card
              href={`/rooms/${roomId}/room-edit`}
              className="w-full center flex-col h-16"
            >
              <span>設定</span>
              <span>変更</span>
            </Card>
          </div>
          <div>スコア</div>
          <div>チップ</div>
          <div>収支</div>
        </div>
        {roomDetailUser.map((user) => (
          <div className="grid-5-inner" key={user.id}>
            <div className="center p-0.5 bg-white">
              <UserCard
                href={`/rooms/${roomId}/user-edit/${user.id}`}
                name={user.name}
                icon={user.icon}
                size="mdWf"
              />
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
    </>
  );
};

export default GameBoard;
