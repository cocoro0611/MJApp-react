"use client";

import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("cognito");
    }
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="container mx-auto bg-white min-h-screen shadow-xl">
        <Header title="　" isBackIcon={false} />
        <Main className="font-bold">ログイン画面に遷移中...</Main>
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
