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
        <div className="info-box-secondary mb-8">
          <p>ルーム作成時に使用する</p>
          <p>デフォルト設定を選択してください。</p>
        </div>
        <SettingForm setting={setting} />
      </Content>
    </>
  );
};

export default SettingPage;
