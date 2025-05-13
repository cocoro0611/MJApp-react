import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Form from "next/form";
import InputField from "@/src/components/form/InputField";
import IconSelectField from "@/src/components/form/IconSelectField";
import ToastButton from "@/src/components/nav/ToastButton";
import { createUser } from "@/src/lib/models/users/create";

const UserNewPage = () => {
  return (
    <>
      <Header title="ユーザー作成" href="/users" />
      <Main>
        <Form action={createUser} className="center flex-col space-y-8">
          <InputField
            label="名前"
            name="name"
            type="text"
            maxLength={4}
            placeholder="名前を入力（４文字以内）"
            className="w-[19.4rem] md:w-[39.2rem]"
          />
          <IconSelectField />
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

export default UserNewPage;
