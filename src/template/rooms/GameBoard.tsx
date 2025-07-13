"use client";

import Card from "@/src/components/ui/Card";
import UserCard from "../users/UserCard";
import { ReadRoomDetailUser } from "@/src/lib/models/rooms/type";

interface GameBoardProps {
  shouldShowPoints: boolean;
  roomDetailUser: ReadRoomDetailUser[];
  shouldShowChip: boolean;
  roomId: string;
}

const GameBoard = ({
  shouldShowPoints,
  roomDetailUser,
  shouldShowChip,
  roomId,
}: GameBoardProps) => {
  return (
    <>
      <div className="grid-5 center bg-primary-800 text-white">
        <div className="grid-5-inner">
          <div className="center p-0.5 bg-white">
            <Card
              href={`/rooms/${roomId}/room-edit`}
              leftBorder="sm"
              className="h-16 w-full center flex-col"
            >
              <p>設定</p>
              <p>変更</p>
            </Card>
          </div>
          <div className="py-1">スコア</div>
          {shouldShowChip && <div className="py-1">チップ</div>}
          {shouldShowPoints && <div className="py-1">収支</div>}
        </div>
        {roomDetailUser.map((user) => (
          <div className="grid-5-inner" key={user.id}>
            <div className="center p-0.5 bg-white">
              <UserCard
                href={`/rooms/${roomId}/user-edit/${user.id}`}
                leftBorder="sm"
                className="h-16 w-full"
                name={user.name}
                icon={user.icon}
              />
            </div>
            <div className="py-1">
              {user.totalScore >= 0 ? `+${user.totalScore}` : user.totalScore}
            </div>
            {shouldShowChip && (
              <div className="relative py-1">
                {user.totalChip >= 0 ? `+${user.totalChip}` : user.totalChip}
                <span className="absolute bottom-0 right-0.5 text-[0.6rem]">
                  枚
                </span>
              </div>
            )}
            {shouldShowPoints && (
              <div className="relative py-1">
                {user.totalPoint >= 0 ? `+${user.totalPoint}` : user.totalPoint}
                <span className="absolute bottom-0 right-0.5 text-[0.6rem]">
                  P
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
