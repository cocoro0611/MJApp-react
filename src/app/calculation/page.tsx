import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Button from "@/src/components/ui/Button";

const CalculationPage = () => {
  return (
    <>
      <Header title="計算一覧" showBackButton={false} />
      <Content className="font-bold">
        <Button
          href="/calculation/han-count"
          color="primary-light"
          className="rounded-lg p-8 text-lg w-60 mb-8 shadow-xl"
        >
          飜数計算
        </Button>
        <Button
          href="/calculation/fu-count"
          color="primary-light"
          className="rounded-lg p-8 text-lg w-60 shadow-xl"
        >
          符数計算
        </Button>
      </Content>
    </>
  );
};

export default CalculationPage;
