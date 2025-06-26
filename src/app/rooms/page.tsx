import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import RoomCard from "@/src/template/Rooms/RoomCard";
import Button from "@/src/components/ui/Button";
import { readRooms } from "@/src/lib/models/rooms";
import { readDefaultUsers } from "@/src/lib/models/users";

const RoomsPage = async () => {
  const rooms = await readRooms();
  const defaultUsers = await readDefaultUsers();
  return (
    <>
      <Header title="ルーム一覧" isBackIcon={false} />
      <Main>
        <div className="space-y-4">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              href={`/rooms/${room.id}`}
              name={room.name}
              users={room.users}
            />
          ))}
        </div>
        <Button
          href="/rooms/new"
          isFixed={true}
          disabled={defaultUsers.length < 4}
        />
      </Main>
    </>
  );
};

export default RoomsPage;
