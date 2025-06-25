import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Button from "@/src/components/ui/Button";
import Link from "next/link";

const CalculationPage = () => {
  return (
    <>
      <Header title="　" isBackIcon={false} />
      <Main>
        <div className="center flex-col space-y-8">
          <div className="text-xl font-bold mb-2">計算の内容</div>
          <div className="text-gray-600 text-sm mb-8 font-semibold">
            <p>計算したい内容を選択してください。</p>
          </div>
          <Link href="/calculation/han-count" className="w-full">
            <Button custom={true} className="rounded px-4 py-2 w-full">
              飜数計算
            </Button>
          </Link>
          <Link href="/calculation/fu-count" className="w-full">
            <Button custom={true} className="rounded px-4 py-2 w-full">
              符数計算
            </Button>
          </Link>
        </div>
      </Main>
    </>
  );
};

export default CalculationPage;
