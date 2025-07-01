import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Button from "@/src/components/ui/Button";

const SettingPage = async () => {
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
      </Main>
    </>
  );
};

export default SettingPage;
