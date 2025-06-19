import Image from "next/image";
import Link from "next/link";
import Button from "../../ui/Button";

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
      <div className="flex justify-between font-bold">
        <label className="flex text-blue-800">ユーザー</label>
        <Link href="/rooms/new/users">
          <Button
            color="secondary"
            custom={true}
            className="px-4 py-1 rounded-lg text-sm"
          >
            カスタム
          </Button>
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
