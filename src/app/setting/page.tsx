"use client";

import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import Card from "@/src/components/ui/Card";
import LogoutForm from "@/src/components/form/LogoutForm";
import BuildIcon from "@mui/icons-material/Build";
import PaletteIcon from "@mui/icons-material/Palette";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
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

  const handleShowPointSettingAccess = async () => {
    const response = await fetch("/api/auth/actions/admin", { method: "POST" });

    if (response.ok) {
      router.push("/setting/show-point-setting");
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
            <div className="flex justify-start items-center gap-6">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                <BuildIcon className="text-white" />
              </div>
              <p className="font-bold">ルーム設定</p>
            </div>
          </Card>
          {/* テーマカラー設定はAdmin権限しか行えない */}
          <Card
            disabled={!isAdmin}
            onClick={handleColorSettingAccess}
            leftBorder="lg"
            className="p-4 w-80"
          >
            <div className="flex justify-start items-center gap-6">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                <PaletteIcon className="text-white" />
              </div>
              <p className="font-bold">テーマカラー設定</p>
            </div>
          </Card>
          {/* ポイントの非表示設定はAdmin権限しか行えないかつ表示されない */}
          {isAdmin && (
            <Card
              disabled={!isAdmin}
              onClick={handleShowPointSettingAccess}
              leftBorder="lg"
              className="p-4 w-80"
            >
              <div className="flex justify-start items-center gap-6">
                <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-4 shadow">
                  <CurrencyYenIcon className="text-white" />
                </div>
                <p className="font-bold">ポイントの非表示設定</p>
              </div>
            </Card>
          )}
        </div>
      </Content>
    </>
  );
};

export default SettingPage;
