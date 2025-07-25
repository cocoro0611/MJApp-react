"use client";

import Form from "next/form";
import InputField from "@/src/components/form/InputField";
import SelectIcon from "./utils/SelectIcon";
import ToastButton from "@/src/components/nav/ToastButton";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { useState } from "react";
import type { ReadUser } from "@/src/lib/models/users/type";
import type { ServerAction } from "@/src/hooks/ui/useServerActionToast";

interface UserFormProps {
  action: ServerAction;
  btnText: string;
  user?: ReadUser;
  roomId?: string;
}

const UserForm = ({ action, btnText, user, roomId }: UserFormProps) => {
  const [name, setName] = useState(user?.name ?? "");
  const icon = user?.icon ?? "";

  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(action);

  return (
    <Form action={handleSubmit} className="space-y-8">
      <input type="hidden" name="roomId" value={roomId} />
      <input type="hidden" name="userId" value={user?.id} />
      <InputField
        label="名前"
        name="name"
        type="text"
        maxLength={5}
        placeholder="名前を入力（５文字以内）"
        value={name}
        onChange={(value) => setName(value)}
      />
      <SelectIcon name={name} value={icon} />
      <ToastButton
        disabled={name.length === 0}
        toastMessage={toastMessage}
        toastColor={toastColor}
        redirect={redirect}
      >
        {isPending ? `${btnText}中...` : btnText}
      </ToastButton>
    </Form>
  );
};

export default UserForm;
