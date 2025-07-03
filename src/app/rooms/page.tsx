import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import RoomCard from "@/src/template/rooms/RoomCard";
import ButtonFixed from "@/src/components/ui/ButtonFixed";
import MessageHandler from "@/src/components/nav/MessageHandler";
import { readRooms } from "@/src/lib/models/rooms";
import { readDefaultUsers } from "@/src/lib/models/users";

const RoomsPage = async () => {
  const rooms = await readRooms();
  const defaultUsers = await readDefaultUsers();
  return (
    <>
      <Header title="ルーム一覧" showBackButton={false} />
      <Content>
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
        <ButtonFixed href="/rooms/new" disabled={defaultUsers.length < 4} />
      </Content>
      <MessageHandler type="room" />
    </>
  );
};

export default RoomsPage;
