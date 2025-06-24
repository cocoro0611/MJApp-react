"use client";

// FIXME: 各ページに配置しなくてもここで完結させたい

import Header from "@/src/components/layout/Header";
import Link from "next/link";
import Button from "../components/ui/Button";

const Error = async () => {
  return (
    <>
      <Header title="　" isBackIcon={false} />
      <div className="center flex-col">
        <div className="text-9xl font-bold text-gray-300">500</div>
        <div className="text-2xl font-bold text-gray-800 mb-4">
          サーバーエラーが発生しました
        </div>
        <div className="text-gray-600 mb-8">
          <p>申し訳ございませんが、サーバーで問題が発生したため、</p>
          <p>ページを表示することができません。</p>
          <p className="mt-2">しばらく時間をおいてから再度お試しください。</p>
        </div>
      </div>
      <Link href="/" className="space-y-4 center">
        <Button className="w-50">ホームページに戻る</Button>
      </Link>
    </>
  );
};

export default Error;
