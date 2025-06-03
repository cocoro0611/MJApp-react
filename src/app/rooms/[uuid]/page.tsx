import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import DeleteForm from "@/src/components/form/DeleteForm";
import GameBord from "@/src/template/Rooms/GameBord";
import { readRoom } from "@/src/lib/models/rooms/read/read-room";
import { deleteRoom } from "@/src/lib/models/rooms/delete";

interface RoomEditPageProps {
  params: Promise<{ uuid: string }>;
}

const RoomEditPage = async ({ params }: RoomEditPageProps) => {
  const { uuid } = await params;
  const room = await readRoom(uuid);

  if (!room) {
    throw new Error("ルームが見つかりません");
  }

  return (
    <>
      <Header title={room.name} href="/rooms">
        <DeleteForm action={deleteRoom} name="id" value={room?.id} />
      </Header>
      <Main>
        <GameBord room={room} />
        
        <div className="score-container room-container-border">
          <div className="room-container-inner-border">sss</div>
          <div className="room-container-inner-border">sss</div>
          <div className="room-container-inner-border">sss</div>
          <div className="room-container-inner-border">sss</div>
          <div className="room-container-inner-border">sss</div>
        </div>
      </Main>
    </>
  );
};

export default RoomEditPage;
