import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Box from "@/src/components/ui/Box";
import ColorSelector from "@/src/template/setting/ColorSelector";
import { readSetting } from "@/src/lib/models/setting";

const ColorSettingPage = async () => {
  const session = await getServerSession(authOptions);
  const setting = await readSetting();

  // ログインしていない、またはadmin権限がない場合はリダイレクト
  if (!session || !session.user?.groups?.includes("admin")) {
    redirect("/setting");
  }

  const defaultPrimaryColor = setting.primaryColor || "blue";
  const defaultSecondaryColor = setting.secondaryColor || "orange";

  return (
    <>
      <Header title="テーマカラー設定" href="/setting" />
      <Content>
        <Box>
          <div className="mb-4">テーマカラーを選択してください</div>
          <div className="text-sm">
            現在のメインカラー：{defaultPrimaryColor}
          </div>
          <div className="text-sm">
            現在のサブカラー：{defaultSecondaryColor}
          </div>
        </Box>
        <ColorSelector
          defaultPrimaryColor={defaultPrimaryColor}
          defaultSecondaryColor={defaultSecondaryColor}
        />
      </Content>
    </>
  );
};

export default ColorSettingPage;
