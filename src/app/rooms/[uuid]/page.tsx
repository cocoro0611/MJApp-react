import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import DeleteForm from "@/src/components/form/DeleteForm";
import AddDataDialog from "@/src/components/nav/AddDataDialog";
import {
  GameBoard,
  PointBoard,
  ScoreBoard,
  ChipBoard,
  InputBoard,
} from "@/src/template/Rooms";
import {
  readRoom,
  readScores,
  readChips,
  deleteRoom,
} from "@/src/lib/models/rooms";

interface RoomEditPageProps {
  params: Promise<{ uuid: string }>;
}

const RoomEditPage = async ({ params }: RoomEditPageProps) => {
  const { uuid } = await params;
  const room = await readRoom(uuid);
  const scores = await readScores(uuid);
  const chips = await readChips(uuid);

  // FIXME: 実際の場代を呼び出し
  const PointData = [0, 0, 0, 0];

  if (!room) {
    throw new Error("ルームが見つかりません");
  }

  return (
    <>
      <Header
        title={room.name}
        href="/rooms"
        addContent={<GameBoard room={room} />}
      >
        <DeleteForm action={deleteRoom} name="id" value={room?.id} />
      </Header>
      <Main isBlank={false}>
        <PointBoard points={PointData} />
        <ScoreBoard scores={scores} />
        <ChipBoard chips={chips} />
        <AddDataDialog roomId={uuid} />
      </Main>
      {/* <InputBoard /> */}
    </>
  );
};

export default RoomEditPage;
