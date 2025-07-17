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
import { readSetting } from "@/src/lib/models/setting";
import { getShowPointsServer } from "@/src/hooks/auth/getShowPointsServer";

interface RoomEditPageProps {
  params: Promise<{ roomId: string }>;
}

const RoomEditPage = async ({ params }: RoomEditPageProps) => {
  const { roomId } = await params;
  const roomDetail = await readRoomDetail(roomId);
  const scores = await readScores(roomId);
  const chips = await readChips(roomId);
  const setting = await readSetting();

  // チップの有無でgameBoardの表示を変更
  const showChip = chips.length > 0;

  // MonitorかisShowPointがtuerの時の表示制御
  const showPoints = await getShowPointsServer(setting?.isShowPoint ?? true);
  return (
    <>
      <Header
        title={roomDetail.name}
        href="/rooms"
        extra={
          <GameBoard
            showPoints={showPoints}
            showChip={showChip}
            roomDetailUser={roomDetail.users}
            roomId={roomId}
          />
        }
      >
        <DeleteForm action={deleteRoom} name="id" value={roomId} />
      </Header>

      {/* extraの調整 */}
      <div className={showChip ? "pt-31.5 lg:pt-29.5" : "pt-24 lg:pt-22"} />

      {/* showPointsの調整 */}
      <div className={showPoints ? "" : "-mt-7.5"} />

      <Content isBlank={false}>
        {showPoints && (
          <AmountBoard roomId={roomId} amount={roomDetail.gameAmount} />
        )}
        <ScoreForm
          scores={scores}
          chips={chips}
          roomId={roomId}
          roomInitialPoint={roomDetail.initialPoint}
        />
        <ChipForm scores={scores} chips={chips} roomId={roomId} />
        <AddDataForm roomId={roomId} />
      </Content>
    </>
  );
};

export default RoomEditPage;
