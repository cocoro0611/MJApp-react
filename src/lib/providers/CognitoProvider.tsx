"use client";

import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import { useEffect, useRef } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const isLoggingOut = useRef(false);

  useEffect(() => {
    // ログアウト処理中の場合は認証チェックをスキップ
    if (isLoggingOut.current) {
      return;
    }

    if (status === "unauthenticated") {
      signIn("cognito");
    }
  }, [status]);

  // ログアウト開始を検知するためのイベントリスナー
  useEffect(() => {
    const handleLogoutStart = () => {
      isLoggingOut.current = true;
    };

    const handleLogoutEnd = () => {
      isLoggingOut.current = false;
    };

    window.addEventListener("logout-start", handleLogoutStart);
    window.addEventListener("logout-end", handleLogoutEnd);

    return () => {
      window.removeEventListener("logout-start", handleLogoutStart);
      window.removeEventListener("logout-end", handleLogoutEnd);
    };
  }, []);

  if (
    status === "loading" ||
    (status === "unauthenticated" && !isLoggingOut.current)
  ) {
    return (
      <div className="container mx-auto bg-white min-h-screen shadow-xl">
        <Header title="　" isBackIcon={false} />
        <Content className="font-bold">ログイン画面に遷移中...</Content>
      </div>
    );
  }

  return <>{children}</>;
};

export default function CognitoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthGuard>{children}</AuthGuard>
    </SessionProvider>
  );
}
