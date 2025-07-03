import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import OrderEditForm from "@/src/template/rooms/OrderEditForm";
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
      <Header title="　" showBackButton={false} />
      <Content>
        <OrderEditForm
          roomId={roomId}
          gameCount={Number(gameCount)}
          tiedScores={tiedScores}
        />
      </Content>
    </>
  );
};

export default OrderEditPage;
