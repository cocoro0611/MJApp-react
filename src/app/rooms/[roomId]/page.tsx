import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import DeleteForm from "@/src/components/form/DeleteForm";
import AddDataDialog from "@/src/components/nav/AddDataDialog";
import { GameBoard, AmountBoard, DataForm } from "@/src/template/Rooms";
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

  if (!roomDetail) {
    throw new Error("ルームが見つかりません");
  }

  return (
    <>
      <Header
        title={roomDetail.name}
        href="/rooms"
        addContent={
          <GameBoard roomDetailUser={roomDetail.users} roomId={roomId} />
        }
      >
        <DeleteForm action={deleteRoom} name="id" value={roomId} />
      </Header>
      <Main isBlank={false}>
        <AmountBoard amount={roomDetail.gameAmount} />
        <DataForm scores={scores} chips={chips} roomDetail={roomDetail} />
        <AddDataDialog roomId={roomId} />
      </Main>
    </>
  );
};

export default RoomEditPage;
