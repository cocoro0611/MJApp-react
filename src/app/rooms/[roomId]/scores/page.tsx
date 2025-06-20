import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import { readRoom, readScores } from "@/src/lib/models/rooms";

interface RoomScoresPageProps {
  params: Promise<{ roomId: string }>;
}

const RoomScorePage = async ({ params }: RoomScoresPageProps) => {
  const { roomId } = await params;
  const room = await readRoom(roomId);
  const score = await readScores(roomId);

  return (
    <>
      <Header title="スコアの詳細" href={`/rooms/${roomId}`} />
      <Main>
        {/* FIXME: スコアページのレイアウト */}
        <div className="center flex-col">
          <div>ルーム名：{room?.name}</div>
          <div>{score.map((score) => score.gameCount)}</div>
        </div>
      </Main>
    </>
  );
};

export default RoomScorePage;
