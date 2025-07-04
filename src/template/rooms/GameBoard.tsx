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
          <div>スコア</div>
          {shouldShowChip && <div>チップ</div>}
          {shouldShowPoints && <div>収支</div>}
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
            <div>
              {user.totalScore >= 0 ? `+${user.totalScore}` : user.totalScore}
            </div>
            {shouldShowChip && (
              <div className="relative">
                {user.totalChip >= 0 ? `+${user.totalChip}` : user.totalChip}
                <span className="absolute bottom-0 right-0.5 text-[0.6rem]">
                  枚
                </span>
              </div>
            )}
            {shouldShowPoints && (
              <div className="relative">
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
