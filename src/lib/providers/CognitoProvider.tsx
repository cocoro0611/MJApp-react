"use client";

import Content from "@/src/components/layout/Content";
import CircularProgress from "@mui/material/CircularProgress";
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
      <Content className="min-h-screen center">
        <CircularProgress />
        <p className="text-lg font-bold mt-4">読み込み中...</p>
      </Content>
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
