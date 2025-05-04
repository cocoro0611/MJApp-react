import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Form from "next/form";
import InputField from "@/src/components/form/InputField";
import SelectField from "@/src/components/form/SelectField";
import ToastButton from "@/src/components/nav/ToastButton";

const RoomNewPage = () => {
  return (
    <>
      <Header title="ルームの作成" href="/rooms" />
      <Main>
        {/* TODO: createRoomのアクションの実装 */}
        <Form action="" className="center flex-col space-y-8">
          <InputField
            label="部屋名"
            name="name"
            type="text"
            maxLength={10}
            placeholder="部屋名を入力"
            className="w-[19.4rem] md:w-[39.2rem]"
          />
          <SelectField
            label="持ち点"
            name="name"
            className="w-[19.4rem] md:w-[39.2rem]"
          />
          <ToastButton
            alertMessage="作成しました"
            alertColor="success"
            className="w-[19.4rem] md:w-[39.2rem]"
          >
            作成
          </ToastButton>
        </Form>
      </Main>
    </>
  );
};

export default RoomNewPage;
