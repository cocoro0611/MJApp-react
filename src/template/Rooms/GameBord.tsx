import Card from "@/src/components/ui/Card";
import UserCard from "@/src/template/Users/UserCard";
import { ReadRoomDetailData } from "@/src/lib/models/rooms/type";

interface GameBordProps {
  room: ReadRoomDetailData;
}

const GameBord = ({ room }: GameBordProps) => {
  return (
    <div className="room-container room-container-border">
      <div className="room-container-inner-border">
        <div className="center p-0.5 bg-white">
          <Card
            href=""
            className="secondary card-border h-16 w-full center flex-col"
          >
            <span>設定</span>
            <span>変更</span>
          </Card>
        </div>
        <div>スコア</div>
        <div>チップ</div>
        <div>収支</div>
      </div>
      {room.users.map((user) => (
        <div className="room-container-inner-border" key={user.id}>
          <div className="center p-0.5 bg-white">
            <UserCard href="" name={user.name} icon={user.icon} size="sm" />
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
            <span className="absolute bottom-0 right-0.5 text-[0.6rem]">P</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameBord;
