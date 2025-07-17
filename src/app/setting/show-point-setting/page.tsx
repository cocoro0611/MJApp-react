import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Box from "@/src/components/ui/Box";
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
      <Header title="ポイントの表示設定" href="/setting" />
      <Content>
        <Box>
          <div className="mb-4">ゲームの表示を選択してください</div>
          <div className="text-sm">
            現在の設定：
            {setting.isShowPoint
              ? "ポイントが表示されます"
              : "ポイントは非表示です"}
          </div>
        </Box>
        <ShowPoint isShowPoint={setting.isShowPoint ?? true} />
      </Content>
    </>
  );
};

export default ShowPointSettingPage;
