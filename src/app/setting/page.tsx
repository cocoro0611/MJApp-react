"use client";

import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Button from "@/src/components/ui/Button";
import { useSession, signOut } from "next-auth/react";

const SettingPage = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user.groups?.includes("admin") || false;

  const noticeCreate = async () => {
    const response = await fetch("/api/auth/actions/admin", { method: "POST" });
    if (response.ok) console.log("実処理はここに書く");
  };

  const handleLogout = async () => {
    // 1. NextAuthからサインアウト
    await signOut({ redirect: false });

    // 2. Cognitoのログアウト用URLを取得してリダイレクト
    const response = await fetch("/api/auth/logout", { method: "POST" });
    const { logoutUrl } = await response.json();
    window.location.href = logoutUrl;
  };

  return (
    <>
      <Header title="設定一覧" isBackIcon={false} />
      <Main className="font-bold">
        <Button
          href="/setting/room-setting"
          color="primary-light"
          className="rounded p-4 text-lg w-60 mb-8"
        >
          ルーム設定
        </Button>
        {session && (
          <Button
            color="danger"
            className="rounded p-4 text-lg w-60 mb-8"
            onClick={handleLogout}
          >
            ログアウト
          </Button>
        )}
        <Button
          color="primary"
          className="rounded p-4 text-lg w-60 mb-8"
          disabled={!isAdmin}
          onClick={noticeCreate}
        >
          テストボタン
        </Button>
      </Main>
    </>
  );
};

export default SettingPage;
