import Card from "@/src/components/ui/Card";
import Image from "next/image";

type RoomUsers = {
  name: string;
  icon: string;
  totalScore: number;
};

interface RoomCardProps {
  href: string;
  name: string;
  users: RoomUsers[];
}

const RoomCard = ({ href, name, users }: RoomCardProps) => {
  return (
    <Card href={href} className="flex flex-col px-4 py-2">
      <div className="text-left">{name}</div>
      <div className="center gap-8">
        {users.map((user) => (
          <div key={user.name} className="text-xs">
            <Image
              src={user.icon}
              alt={`${user.name}のアイコン`}
              width={40}
              height={40}
              className="pb-1"
            />
            <div>{user.name}</div>
            <div
              className={user.totalScore < 0 ? "text-red-500" : "text-blue-500"}
            >
              {user.totalScore}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RoomCard;
