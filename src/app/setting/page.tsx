"use client";

import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Card from "@/src/components/ui/Card";
import LogoutForm from "@/src/components/form/LogoutForm";
import BuildIcon from "@mui/icons-material/Build";
import PaletteIcon from "@mui/icons-material/Palette";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SettingPage = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user.groups?.includes("admin") || false;
  const router = useRouter();

  const handleColorSettingAccess = async () => {
    const response = await fetch("/api/auth/actions/admin", { method: "POST" });

    if (response.ok) {
      router.push("/setting/color-setting");
    } else {
      alert("管理者権限が必要です");
    }
  };

  return (
    <>
      <Header title="設定一覧" showBackButton={false}>
        {/* PCサイズではログアウトボタンはサイドバーに移動 */}
        <div className="lg:hidden">
          <LogoutForm />
        </div>
      </Header>
      <Content>
        <div className="grid-1 gap-8">
          <Card
            href="/setting/room-setting"
            leftBorder="lg"
            className="p-4 w-80"
          >
            <div className="center flex-col">
              <p className="bg-primary-300 rounded-full p-2">
                <BuildIcon />
              </p>
              <p className="font-bold pt-2">ルーム設定</p>
            </div>
          </Card>
          {/* テーマカラー設定はAdmin権限しか行えない */}
          <Card
            disabled={!isAdmin}
            onClick={handleColorSettingAccess}
            leftBorder="lg"
            className="p-4 w-80"
          >
            <div className="center flex-col">
              <p className="bg-primary-300 rounded-full p-2">
                <PaletteIcon />
              </p>
              <p className="font-bold pt-2">テーマカラー設定</p>
            </div>
          </Card>
        </div>
      </Content>
    </>
  );
};

export default SettingPage;
