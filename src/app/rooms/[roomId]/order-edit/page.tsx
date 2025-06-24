import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import OrderEditForm from "@/src/components/form/rooms/OrderEditForm";
import { readTiedScores } from "@/src/lib/models/rooms";

interface OrderEditPageProps {
  params: Promise<{ roomId: string }>;
  searchParams: Promise<{ gameCount?: string }>;
}

const OrderEditPage = async ({ params, searchParams }: OrderEditPageProps) => {
  const { roomId } = await params;
  const { gameCount } = await searchParams;

  if (!gameCount) {
    throw new Error("ゲーム回数が指定されていません");
  }

  const tiedScores = await readTiedScores(roomId, Number(gameCount));

  if (!tiedScores || tiedScores.length === 0) {
    throw new Error("同点データが見つかりません");
  }

  return (
    <>
      <Header title="　" isBackIcon={false} />
      <Main>
        <OrderEditForm
          roomId={roomId}
          gameCount={Number(gameCount)}
          tiedScores={tiedScores}
        />
      </Main>
    </>
  );
};

export default OrderEditPage;
