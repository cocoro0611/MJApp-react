import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import RoomCard from "@/src/template/Rooms/RoomCard";
import ButtonFixed from "@/src/components/ui/ButtonFixed";
import { readRooms } from "@/src/lib/models/rooms";
import { readDefaultUsers } from "@/src/lib/models/users";

const RoomsPage = async () => {
  const rooms = await readRooms();
  const defaultUsers = await readDefaultUsers();
  return (
    <>
      <Header title="ルーム一覧" isBackIcon={false} />
      <Main>
        <div className="center flex-col space-y-4">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              href={`/rooms/${room.id}`}
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
