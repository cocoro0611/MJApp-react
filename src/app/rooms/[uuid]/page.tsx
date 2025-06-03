import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import DeleteForm from "@/src/components/form/DeleteForm";
import GameBoard from "@/src/template/Rooms/GameBoard";
import ScoreBoard from "@/src/template/Rooms/ScoreBoard";
import { readRoom } from "@/src/lib/models/rooms/read/read-room";
import { deleteRoom } from "@/src/lib/models/rooms/delete";

interface RoomEditPageProps {
  params: Promise<{ uuid: string }>;
}

const ScoreData = [
  {
    gameCount: 1,
    scores: [
      { position: 1, score: 10 },
      { position: 2, score: 10 },
      { position: 3, score: 10 },
      { position: 4, score: 10 },
    ],
  },
  {
    gameCount: 2,
    scores: [
      { position: 1, score: 10 },
      { position: 2, score: 10 },
      { position: 3, score: 10 },
      { position: 4, score: 10 },
    ],
  },
  {
    gameCount: 3,
    scores: [
      { position: 1, score: 10 },
      { position: 2, score: 10 },
      { position: 3, score: 10 },
      { position: 4, score: 10 },
    ],
  },
  {
    gameCount: 4,
    scores: [
      { position: 1, score: 10 },
      { position: 2, score: 10 },
      { position: 3, score: 10 },
      { position: 4, score: 10 },
    ],
  },
];

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
        <GameBoard room={room} />
        <ScoreBoard scores={ScoreData} />
      </Main>
    </>
  );
};

export default RoomEditPage;
