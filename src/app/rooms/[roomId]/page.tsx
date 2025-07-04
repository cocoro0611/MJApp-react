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
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

interface RoomEditPageProps {
  params: Promise<{ roomId: string }>;
}

const RoomEditPage = async ({ params }: RoomEditPageProps) => {
  const session = await getServerSession(authOptions);
  const isMonitor = session?.user.groups?.includes("monitor") || false;

  const { roomId } = await params;
  const roomDetail = await readRoomDetail(roomId);
  const scores = await readScores(roomId);
  const chips = await readChips(roomId);

  const setting = await readSetting();
  const isShowPoint = setting?.isShowPoint ?? true;

  // チップの有無でgameBoardの表示を変更
  const shouldShowChip = chips.length > 0;

  // isMonitor = false, isShowPoint = true  → 表示 ✅
  // isMonitor = false, isShowPoint = false → 非表示 ✅
  // isMonitor = true,  isShowPoint = true  → 非表示 ✅
  // isMonitor = true,  isShowPoint = false → 非表示 ✅
  const shouldShowPoints = isShowPoint && !isMonitor;
  return (
    <>
      <Header
        title={roomDetail.name}
        href="/rooms"
        extra={
          <GameBoard
            shouldShowPoints={shouldShowPoints}
            roomDetailUser={roomDetail.users}
            shouldShowChip={shouldShowChip}
            roomId={roomId}
          />
        }
      >
        <DeleteForm action={deleteRoom} name="id" value={roomId} />
      </Header>

      {/* extraの調整 */}
      <div className={shouldShowChip ? "pt-25.5" : "pt-20"} />

      {/* shouldShowPointsの調整 */}
      <div className={shouldShowPoints ? "" : "-mt-6 lg:-mt-7.5"} />

      <Content isBlank={false}>
        {shouldShowPoints && (
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
