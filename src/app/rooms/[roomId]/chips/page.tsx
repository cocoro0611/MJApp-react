import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import { readRoomDetail, readChips } from "@/src/lib/models/rooms";

interface RoomChipsPageProps {
  params: Promise<{ roomId: string }>;
}

const RoomChipsPage = async ({ params }: RoomChipsPageProps) => {
  const { roomId } = await params;
  const room = await readRoomDetail(roomId);
  const chips = await readChips(roomId);

  return (
    <>
      <Header title="チップの詳細" href={`/rooms/${roomId}`} />
      <Main>
        {/* FIXME: チップページのレイアウト */}
        <div className="center flex-col">
          <div>ルーム名：{room?.name}</div>
          <div>{chips.map((chip) => chip.gameCount)}</div>
        </div>
      </Main>
    </>
  );
};

export default RoomChipsPage;
