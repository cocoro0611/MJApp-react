import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import DeleteForm from "@/src/components/form/DeleteForm";
import AddDataForm from "@/src/template/rooms/AddDataForm";
import GameBoard from "@/src/template/rooms/GameBoard";
import AmountBoard from "@/src/template/rooms/AmountBoard";
import ScoreForm from "@/src/template/rooms/ScoreForm";
import ChipForm from "@/src/template/rooms/ChipForm";
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

  // チップの有無でgameBoardの表示を変更
  const totalChipSum = roomDetail.users.reduce(
    (sum, user) => sum + user.totalChip,
    0
  );
  const shouldShowChip = totalChipSum !== 0;
  return (
    <>
      <Header
        title={roomDetail.name}
        href="/rooms"
        extra={
          <GameBoard
            roomDetailUser={roomDetail.users}
            shouldShowChip={shouldShowChip}
            roomId={roomId}
          />
        }
      >
        <DeleteForm action={deleteRoom} name="id" value={roomId} />
      </Header>

      {/* extraの分の調整 */}
      <div className={shouldShowChip ? "pt-25.5" : "pt-20"} />

      <Content isBlank={false}>
        <AmountBoard roomId={roomId} amount={roomDetail.gameAmount} />
        <ScoreForm
          scores={scores}
          chips={chips}
          roomId={roomId}
          roomInitialPoint={roomDetail.initialPoint}
        />
        <ChipForm
          scores={scores}
          chips={chips}
          roomId={roomId}
          roomChipRate={roomDetail.chipRate}
        />
        <AddDataForm roomId={roomId} />
      </Content>
    </>
  );
};

export default RoomEditPage;
