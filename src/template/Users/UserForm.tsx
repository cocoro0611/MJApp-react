"use client";

import Form from "next/form";
import InputField from "@/src/components/form/InputField";
import SelectIcon from "@/src/components/form/users/SelectIcon";
import ToastButton from "@/src/components/nav/ToastButton";
import { useState } from "react";
import type { ReadUserData } from "@/src/lib/models/users/type";

interface UserFormProps {
  action: (formData: FormData) => void;
  btnText: string;
  user?: ReadUserData;
  roomId?: string;
}

const UserForm = ({ action, btnText, user, roomId }: UserFormProps) => {
  const [name, setName] = useState(user?.name ?? "");
  const icon = user?.icon ?? "";

  return (
    <Form action={action} className="center flex-col space-y-8">
      <input type="hidden" name="roomId" value={roomId} />
      <input type="hidden" name="userId" value={user?.id} />
      <InputField
        label="名前"
        name="name"
        type="text"
        maxLength={4}
        placeholder="名前を入力（４文字以内）"
        value={name}
        onChange={(value) => setName(value)}
      />
      <SelectIcon name={name} value={icon} />
      <ToastButton
        disabled={name.length === 0}
        alertMessage={`${btnText}しました`}
        alertColor="success"
        custom={true}
        className="w-full rounded px-4 py-2"
      >
        {btnText}
      </ToastButton>
    </Form>
  );
};

export default UserForm;
