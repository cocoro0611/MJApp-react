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

  const tiedScores = await readTiedScores(roomId, Number(gameCount));

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
