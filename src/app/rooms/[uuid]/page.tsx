import Header from "@/src/components/layout/Header";
import DeleteForm from "@/src/components/form/DeleteForm";
import {
  GameBoard,
  PointBoard,
  ScoreBoard,
  ChipBoard,
  InputBoard,
} from "@/src/template/Rooms";
import AddDataDialog from "@/src/components/nav/AddDataDialog";
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

  const PointData = [0, 0, 0, 0];

  if (!room) {
    throw new Error("ルームが見つかりません");
  }

  return (
    <>
      <Header title={room.name} href="/rooms">
        <DeleteForm action={deleteRoom} name="id" value={room?.id} />
      </Header>
      <GameBoard room={room} />
      <main>
        <PointBoard points={PointData} />
        <ScoreBoard scores={scores} />
        <ChipBoard chips={chips} />
      </main>
      <InputBoard />
      <AddDataDialog roomId={uuid} />
    </>
  );
};

export default RoomEditPage;
