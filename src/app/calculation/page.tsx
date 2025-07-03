import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Card from "@/src/components/ui/Card";
import CalculateIcon from "@mui/icons-material/Calculate";
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
            <div className="center flex-col">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                <CalculateIcon className="text-white" />
              </div>
              <p className="font-bold pt-2">飜数計算</p>
            </div>
          </Card>
          <Card
            href="/calculation/fu-count"
            leftBorder="lg"
            className="p-4 w-80"
          >
            <div className="center flex-col">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                <FunctionsIcon className="text-white" />
              </div>
              <p className="font-bold pt-2">符数計算</p>
            </div>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default CalculationPage;
