import Form from "next/form";
import ToastButton from "@/src/components/nav/ToastButton";
import InputField from "@/src/components/form/InputField";
import IconSelect from "@/src/components/form/IconSelect";
import { createUser } from "@/src/lib/models/users/create";

const UserNewPage = () => {
  return (
    <Form action={createUser} className="center flex-col space-y-8">
      <InputField
        label="名前"
        name="name"
        type="text"
        maxLength={4}
        placeholder="名前を入力（４文字以内）"
        className="w-[19.4rem] md:w-[39.2rem]"
      />
      <IconSelect />
      <ToastButton
        alertMessage="作成しました"
        alertColor="success"
        className="w-[19.4rem] md:w-[39.2rem]"
      >
        作成
      </ToastButton>
    </Form>
  );
};

export default UserNewPage;
