import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";

import ButtonFixed from "@/src/components/ui/ButtonFixed";

const RoomsPage = () => {
  return (
    <>
      <Header title="ルームの作成一覧" isBackIcon={false} />
      <Main>
        ルームの一覧ページ
        <ButtonFixed href="/rooms/new" />
      </Main>
    </>
  );
};

export default RoomsPage;
