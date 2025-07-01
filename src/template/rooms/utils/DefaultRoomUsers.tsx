import Image from "next/image";
import Button from "@/src/components/ui/Button";
import type { ReadUser } from "@/src/lib/models/users/type";

interface DefaultRoomUsersProps {
  roomUsers: ReadUser[];
}

const DefaultRoomUsers = ({ roomUsers }: DefaultRoomUsersProps) => {
  return (
    <div className="w-full font-bold text-primary-800">
      <div className="flex justify-between">
        <label>ユーザー</label>
        <Button
          href="/rooms/new/users"
          color="primary-light"
          className="px-2 py-1 rounded text-xs"
        >
          カスタム
        </Button>
      </div>
      <div className="center gap-6 mt-2">
        {roomUsers.map((user) => (
          <div key={user.id}>
            <input type="hidden" name="userIds" value={user.id} />
            <Image src={user.icon} alt="user-icon" width={50} height={50} />
            <div className="text-sm mt-2">{user.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultRoomUsers;
