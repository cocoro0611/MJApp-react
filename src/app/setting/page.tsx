"use client";

import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Button from "@/src/components/ui/Button";
import LogoutForm from "@/src/components/form/LogoutForm";
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
      <Header title="設定一覧" isBackIcon={false}>
        <LogoutForm />
      </Header>
      <Main className="font-bold">
        <Button
          href="/setting/room-setting"
          color="primary-light"
          className="rounded p-4 text-lg w-60 mb-8"
        >
          ルーム設定
        </Button>
        {/* テーマカラー設定はAdmin権限しか行えない */}
        <Button
          color="primary-light"
          className="rounded p-4 text-lg w-60 mb-8"
          disabled={!isAdmin}
          onClick={handleColorSettingAccess}
        >
          テーマカラー設定
        </Button>
      </Main>
    </>
  );
};

export default SettingPage;
