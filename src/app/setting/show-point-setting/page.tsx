import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import ShowPoint from "@/src/template/setting/ShowPoint";
import { readSetting } from "@/src/lib/models/setting";

const ShowPointSettingPage = async () => {
  const session = await getServerSession(authOptions);

  // ログインしていない、またはadmin権限がない場合はリダイレクト
  if (!session || !session.user?.groups?.includes("admin")) {
    redirect("/setting");
  }

  const setting = await readSetting();

  return (
    <>
      <Header title="ポイントの非表示設定" href="/setting" />
      <Content>
        <div className="bg-secondary-100 border border-secondary-500 text-secondary-800 rounded p-2 font-bold text-sm mb-8">
          ポイントの表示設定を選択してください。
        </div>
        <ShowPoint isShowPoint={setting?.isShowPoint ?? true} />
      </Content>
    </>
  );
};

export default ShowPointSettingPage;
