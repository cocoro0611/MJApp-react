import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import RoomForm from "@/src/template/rooms/RoomForm";
import { readRoomDetail, updateRoom } from "@/src/lib/models/rooms";

interface RoomEditPageProps {
  params: Promise<{ roomId: string }>;
}

const RoomEditPage = async ({ params }: RoomEditPageProps) => {
  const { roomId } = await params;
  const room = await readRoomDetail(roomId);

  return (
    <>
      <Header title="ルームの編集" href={`/rooms/${room.id}`} />
      <Content>
        <RoomForm action={updateRoom} btnText="更新" room={room} />
      </Content>
    </>
  );
};

export default RoomEditPage;
