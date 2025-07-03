import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import SettingForm from "@/src/template/setting/SettingForm";
import { readSetting } from "@/src/lib/models/setting";

const SettingPage = async () => {
  const setting = await readSetting();

  return (
    <>
      <Header title="ルーム設定" href="/setting" />
      <Content>
        <div className="bg-secondary-100 border border-secondary-500 text-secondary-800 rounded p-2 font-bold text-sm mb-8">
          ルームのデフォルトの設定を選択してください。
        </div>
        <SettingForm setting={setting} />
      </Content>
    </>
  );
};

export default SettingPage;
