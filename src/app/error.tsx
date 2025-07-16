"use client";

import Header from "@/src/components/layout/Header";
import Button from "../components/ui/Button";

const Error = () => {
  return (
    <>
      <Header title="　" showBackButton={false} />
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
        <Button href="/">ホームページに戻る</Button>
      </div>
    </>
  );
};

export default Error;
