import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import SettingForm from "@/src/template/setting/SettingForm";
import {
  createDefaultRoom,
  updateDefaultRoom,
  readDefaultRoom,
} from "@/src/lib/models/setting";

const SettingPage = async () => {
  const setting = await readDefaultRoom();

  const formAction = setting ? updateDefaultRoom : createDefaultRoom;
  const btnText = setting ? "更新" : "作成";

  return (
    <>
      <Header title="ルーム設定" href="/setting" />
      <Main>
        <div className="bg-secondary-100 border border-secondary-500 text-secondary-800 rounded p-2 font-bold text-sm mb-8">
          デフォルトのルーム設定を選択してください。
        </div>
        <SettingForm action={formAction} btnText={btnText} setting={setting} />
      </Main>
    </>
  );
};

export default SettingPage;
