import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Box from "@/src/components/ui/Box";
import SettingForm from "@/src/template/setting/SettingForm";
import { readSetting } from "@/src/lib/models/setting";

const SettingPage = async () => {
  const setting = await readSetting();

  return (
    <>
      <Header title="ルーム設定" href="/setting" />
      <Content>
        <Box>
          <div className="text-sm">ルーム作成時に使用する</div>
          <div className="text-sm">デフォルト設定を選択してください。</div>
        </Box>
        <SettingForm setting={setting} />
      </Content>
    </>
  );
};

export default SettingPage;
