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
  readRoom,
  readRoomBoard,
  readScores,
  readChips,
  deleteRoom,
} from "@/src/lib/models/rooms";

interface RoomEditPageProps {
  params: Promise<{ roomId: string }>;
}

const RoomEditPage = async ({ params }: RoomEditPageProps) => {
  const { roomId } = await params;
  const room = await readRoom(roomId);
  const roomBoard = await readRoomBoard(roomId);
  const scores = await readScores(roomId);
  const chips = await readChips(roomId);

  if (!room || !roomBoard) {
    throw new Error("ルームが見つかりません");
  }

  return (
    <>
      <Header
        title={roomBoard.name}
        href="/rooms"
        addContent={<GameBoard roomBoard={roomBoard} />}
      >
        <DeleteForm action={deleteRoom} name="id" value={roomId} />
      </Header>
      <Main isBlank={false}>
        <PointBoard room={room} />
        <ScoreBoard scores={scores} />
        <ChipBoard chips={chips} />
        <AddDataDialog roomId={roomId} />
      </Main>
      {/* <InputBoard /> */}
    </>
  );
};

export default RoomEditPage;
