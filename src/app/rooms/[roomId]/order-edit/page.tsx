import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import RoomForm from "@/src/template/Rooms/RoomForm";
import { readRoomDetail, updateRoom } from "@/src/lib/models/rooms";

interface RoomEditPageProps {
  params: Promise<{ roomId: string }>;
}

const RoomEditPage = async ({ params }: RoomEditPageProps) => {
  const { roomId } = await params;
  const room = await readRoomDetail(roomId);

  if (!room) {
    throw new Error("ルームが見つかりません");
  }

  return (
    <>
      <Header title="順位の編集" isBackIcon={false} />
      <Main>
        <RoomForm action={updateRoom} btnText="更新" room={room} />
      </Main>
    </>
  );
};

export default RoomEditPage;
