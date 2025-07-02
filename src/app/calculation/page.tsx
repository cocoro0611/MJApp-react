import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Button from "@/src/components/ui/Button";

const CalculationPage = () => {
  return (
    <>
      <Header title="計算一覧" isBackIcon={false} />
      <Main className="font-bold">
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
      </Main>
    </>
  );
};

export default CalculationPage;
