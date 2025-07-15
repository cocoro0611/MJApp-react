import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Card from "@/src/components/ui/Card";
import PercentIcon from "@mui/icons-material/Percent";
import FunctionsIcon from "@mui/icons-material/Functions";

const CalculationPage = () => {
  return (
    <>
      <Header title="計算一覧" showBackButton={false} />
      <Content>
        <div className="grid-1 gap-8">
          <Card
            href="/calculation/han-count"
            leftBorder="lg"
            className="p-4 w-80"
          >
            <div className="flex justify-start items-center gap-6">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                <PercentIcon className="text-white" />
              </div>
              <p className="font-bold">飜数計算</p>
            </div>
          </Card>
          <Card
            href="/calculation/fu-count"
            leftBorder="lg"
            className="p-4 w-80"
          >
            <div className="flex justify-start items-center gap-6">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                <FunctionsIcon className="text-white" />
              </div>
              <p className="font-bold">符数計算</p>
            </div>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default CalculationPage;
