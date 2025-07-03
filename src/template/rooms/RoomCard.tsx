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
    <Card href={href} leftBorder="lg" className="flex flex-col p-4 w-80">
      <div className="text-left">{name}</div>
      <div className="center gap-2">
        {users.map((user) => (
          <div key={user.name} className="text-xs center flex-col w-18">
            <Image
              key={user.name}
              src={user.icon}
              alt={`${user.name}のアイコン`}
              width={40}
              height={40}
              className="pb-1"
            />
            <p>{user.name}</p>
            <p
              className={
                user.totalScore < 0 ? "text-negative" : "text-positive"
              }
            >
              {user.totalScore}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RoomCard;
