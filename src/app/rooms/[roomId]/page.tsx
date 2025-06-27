import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import DeleteForm from "@/src/components/form/DeleteForm";
import AddDataForm from "@/src/components/form/rooms/AddDataForm";
import { GameBoard, AmountBoard, ScoreForm } from "@/src/template/Rooms";
import {
  readRoomDetail,
  readScores,
  readChips,
  deleteRoom,
} from "@/src/lib/models/rooms";

interface RoomEditPageProps {
  params: Promise<{ roomId: string }>;
}

const RoomEditPage = async ({ params }: RoomEditPageProps) => {
  const { roomId } = await params;
  const roomDetail = await readRoomDetail(roomId);
  const scores = await readScores(roomId);
  const chips = await readChips(roomId);

  return (
    <>
      <Header
        title={roomDetail.name}
        href="/rooms"
        addContent={
          <GameBoard roomDetailUser={roomDetail.users} roomId={roomId} />
        }
        bottomSpace="pb-45.5"
      >
        <DeleteForm action={deleteRoom} name="id" value={roomId} />
      </Header>
      <Main isBlank={false}>
        <AmountBoard amount={roomDetail.gameAmount} />
        <ScoreForm
          scores={scores}
          roomId={roomId}
          roomInitialPoint={roomDetail.initialPoint}
        />
        <AddDataForm roomId={roomId} />
      </Main>
    </>
  );
};

export default RoomEditPage;
