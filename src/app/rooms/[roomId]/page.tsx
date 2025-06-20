import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import DeleteForm from "@/src/components/form/DeleteForm";
import AddDataDialog from "@/src/components/nav/AddDataDialog";
import {
  GameBoard,
  PointBoard,
  ScoreBoard,
  ChipBoard,
  // InputBoard,
} from "@/src/template/Rooms";
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
        <PointBoard amount={roomDetail.gameAmount} />
        <ScoreBoard
          scores={scores}
          initialPoint={roomDetail.initialPoint}
          roomId={roomId}
        />
        <ChipBoard
          chips={chips}
          chipRate={roomDetail.chipRate}
          roomId={roomId}
        />
        <AddDataDialog roomId={roomId} />
      </Main>
      {/* <InputBoard /> */}
    </>
  );
};

export default RoomEditPage;
