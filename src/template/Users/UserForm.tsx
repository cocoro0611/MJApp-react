import { ReactNode } from "react";
import Form from "next/form";
import InputField from "@/src/components/form/InputField";
import IconSelectField from "@/src/components/form/IconSelectField";
import ToastButton from "@/src/components/nav/ToastButton";
import { createUser } from "@/src/lib/models/users/create";

interface UserFormProps {
  btnText: string;
  children?: ReactNode;
}

const UserForm = ({ children }: UserFormProps) => {
  return (
    <Form action={createUser} className="center flex-col space-y-8">
      {children}
      <InputField
        label="名前"
        name="name"
        type="text"
        maxLength={4}
        placeholder="名前を入力（４文字以内）"
        className="w-[19.4rem] md:w-[39.2rem]"
      />
      <IconSelectField className="w-[19.4rem] md:w-[39.2rem]" />
      <ToastButton
        alertMessage="作成しました"
        alertColor="success"
        disabled={true}
        className="w-[19.4rem] md:w-[39.2rem]"
      >
        作成
      </ToastButton>
    </Form>
  );
};

export default UserForm;
