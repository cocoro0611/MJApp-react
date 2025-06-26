import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Button from "@/src/components/ui/Button";

const CalculationPage = () => {
  return (
    <>
      <Header title="　" isBackIcon={false} />
      <Main className="font-bold">
        <div className="text-xl mb-2">計算の内容</div>
        <div className="text-sm mb-8">
          <p>計算したい内容を選択してください。</p>
        </div>
        <Button
          href="/calculation/han-count"
          color="secondary"
          className="rounded p-4 text-lg w-60 mb-8"
        >
          飜数計算
        </Button>
        <Button
          href="/calculation/fu-count"
          color="secondary"
          className="rounded p-4 text-lg w-60"
        >
          符数計算
        </Button>
      </Main>
    </>
  );
};

export default CalculationPage;
