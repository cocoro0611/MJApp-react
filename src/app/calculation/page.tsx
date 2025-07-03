import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Card from "@/src/components/ui/Card";

const CalculationPage = () => {
  return (
    <>
      <Header title="計算一覧" showBackButton={false} />
      <Content>
        <div className="grid-1 gap-8">
          <Card
            href="/calculation/han-count"
            border="lg"
            className="p-8 w-80 text-lg font-bold"
          >
            飜数計算
          </Card>
          <Card
            href="/calculation/fu-count"
            border="lg"
            className="p-8 w-80 text-lg font-bold"
          >
            符数計算
          </Card>
        </div>
      </Content>
    </>
  );
};

export default CalculationPage;
