import Image from "next/image";
import Link from "next/link";

type UserType = {
  id: string;
  name: string;
  icon: string;
};

interface DefaultRoomUsersProps {
  roomUsers: UserType[];
}

const DefaultRoomUsers = ({ roomUsers }: DefaultRoomUsersProps) => {
  return (
    <div className="form-width">
      <div className="flex justify-between">
        <label className="flex text-blue-800 font-bold">ユーザー</label>
        <Link
          href="/rooms/new/users"
          className="center setting-custom-btn scale-effect"
        >
          カスタム
        </Link>
      </div>
      <div className="center gap-6 mt-2">
        {roomUsers.map((user) => (
          <div key={user.id}>
            <input type="hidden" name="userIds" value={user.id} />
            <Image src={user.icon} alt="user-icon" width={50} height={50} />
            <div className="text-sm text-blue-800 font-bold mt-2">
              {user.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultRoomUsers;
