import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Card from "@/src/components/ui/Card";
import Looks4Icon from "@mui/icons-material/Looks4";
import Filter4Icon from "@mui/icons-material/Filter4";
import Looks3Icon from "@mui/icons-material/Looks3";
import Filter3Icon from "@mui/icons-material/Filter3";

const CalculationPage = () => {
  return (
    <>
      <Header title="計算一覧" showBackButton={false} />
      <Content>
        <div className="grid-1 gap-8">
          <Card
            href="/calculation/yon-han-count"
            leftBorder="lg"
            className="p-4 w-80"
          >
            <div className="flex justify-start items-center gap-6">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                <Looks4Icon className="text-white" />
              </div>
              <p className="font-bold">飜数計算（４人麻雀）</p>
            </div>
          </Card>
          <Card
            href="/calculation/yon-fu-count"
            leftBorder="lg"
            className="p-4 w-80"
          >
            <div className="flex justify-start items-center gap-6">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                <Filter4Icon className="text-white" />
              </div>
              <p className="font-bold">符数計算（４人麻雀）</p>
            </div>
          </Card>
          <Card
            href="/calculation/san-han-count"
            leftBorder="lg"
            className="p-4 w-80"
          >
            <div className="flex justify-start items-center gap-6">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                <Looks3Icon className="text-white" />
              </div>
              <p className="font-bold">飜数計算（３人麻雀）</p>
            </div>
          </Card>
          <Card
            href="/calculation/san-fu-count"
            leftBorder="lg"
            className="p-4 w-80"
          >
            <div className="flex justify-start items-center gap-6">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                <Filter3Icon className="text-white" />
              </div>
              <p className="font-bold">符数計算（３人麻雀）</p>
            </div>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default CalculationPage;
