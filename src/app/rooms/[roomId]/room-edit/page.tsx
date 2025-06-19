import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import RoomForm from "@/src/template/Rooms/RoomForm";
import { readRoom, updateRoom } from "@/src/lib/models/rooms";

interface RoomEditPageProps {
  params: Promise<{ roomId: string }>;
}

const RoomEditPage = async ({ params }: RoomEditPageProps) => {
  const { roomId } = await params;
  const room = await readRoom(roomId);

  if (!room) {
    throw new Error("ルームが見つかりません");
  }

  return (
    <>
      <Header title="ルームの編集" href={`/rooms/${room.id}`} />
      <Main>
        <RoomForm action={updateRoom} btnText="更新" room={room} />
      </Main>
    </>
  );
};

export default RoomEditPage;
