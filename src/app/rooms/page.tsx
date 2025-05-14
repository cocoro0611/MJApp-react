import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import RoomCard from "@/src/template/Rooms/RoomCard";
import ButtonFixed from "@/src/components/ui/ButtonFixed";
import { readDefaultUsers } from "@/src/lib/models/users/read/read-default-users";

// TODO: readroomsの実装
const rooms = [
  {
    id: "11111",
    name: "2025年5月4日",
    users: [
      {
        id: "ssss",
        name: "太郎",
        icon: "/users-icon/monster01.png",
        totalScore: -10,
      },
      {
        id: "ssss",
        name: "二郎",
        icon: "/users-icon/monster02.png",
        totalScore: -30,
      },
      {
        id: "ssss",
        name: "三郎",
        icon: "/users-icon/monster03.png",
        totalScore: 30,
      },
      {
        id: "ssss",
        name: "四郎",
        icon: "/users-icon/monster04.png",
        totalScore: 10,
      },
    ],
  },
  {
    id: "11112",
    name: "2025年5月5日",
    users: [
      { name: "太郎", icon: "/users-icon/monster05.png", totalScore: 30 },
      { name: "二郎", icon: "/users-icon/monster06.png", totalScore: 30 },
      { name: "三郎", icon: "/users-icon/monster07.png", totalScore: -30 },
      { name: "四郎", icon: "/users-icon/monster08.png", totalScore: -10 },
    ],
  },
  {
    id: "11113",
    name: "2025年5月6日",
    users: [
      { name: "太郎", icon: "/users-icon/monster09.png", totalScore: -20 },
      { name: "二郎", icon: "/users-icon/monster10.png", totalScore: -20 },
      { name: "三郎", icon: "/users-icon/monster11.png", totalScore: 20 },
      { name: "四郎", icon: "/users-icon/monster12.png", totalScore: 20 },
    ],
  },
];

const RoomsPage = async () => {
  const defaultUsers = await readDefaultUsers();
  return (
    <>
      <Header title="ルーム一覧" isBackIcon={false} />
      <Main>
        <div className="center flex-col space-y-4">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              href={`/rooms/hogehoge`}
              name={room.name}
              users={room.users}
            />
          ))}
        </div>
        <ButtonFixed href="/rooms/new" disabled={defaultUsers.length < 4} />
      </Main>
    </>
  );
};

export default RoomsPage;
