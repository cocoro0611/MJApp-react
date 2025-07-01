import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import SettingForm from "@/src/template/setting/SettingForm";
import {
  createSetting,
  updateSetting,
  readSetting,
} from "@/src/lib/models/setting";

const SettingPage = async () => {
  const setting = await readSetting();

  const formAction = setting ? updateSetting : createSetting;
  const btnText = setting ? "更新" : "作成";

  return (
    <>
      <Header title="　" isBackIcon={false} />
      <Main>
        <div className="font-bold text-xl mb-2">ルーム設定</div>
        <div className="font-bold text-sm mb-8">
          <p>デフォルトのルーム設定を選択してください。</p>
        </div>
        <SettingForm action={formAction} btnText={btnText} setting={setting} />
      </Main>
    </>
  );
};

export default SettingPage;
