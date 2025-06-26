import Header from "@/src/components/layout/Header";
import Button from "../components/ui/Button";

const NotFound = async () => {
  return (
    <>
      <Header title="　" isBackIcon={false} />
      <div className="center flex-col">
        <div className="text-9xl font-bold text-gray-300">404</div>
        <div className="text-2xl font-bold text-gray-800 mb-4">
          ページが見つかりません
        </div>
        <div className="text-gray-600 mb-8">
          <p>申し訳ございませんが、お探しのページは存在しないか、</p>
          <p>移動または削除された可能性があります。</p>
        </div>
        <Button href="/">ホームページに戻る</Button>
      </div>
    </>
  );
};

export default NotFound;
