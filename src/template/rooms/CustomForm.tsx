"use client";

import Form from "next/form";
import InputField from "@/src/components/form/InputField";
import ToastButton from "@/src/components/nav/ToastButton";
import { useState } from "react";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import type { ServerAction } from "@/src/hooks/ui/useServerActionToast";

interface CustomFormProps {
  action: ServerAction;
  label: string;
  name: string;
  type: "text" | "number" | "hidden";
  maxLength: number;
  placeholder: string;
  isNewRoom?: boolean;
}

const CustomForm = ({
  action,
  label,
  name,
  type,
  maxLength,
  placeholder,
  isNewRoom = false,
}: CustomFormProps) => {
  const [customItem, setCustomItem] = useState("");

  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(action);

  return (
    <Form action={handleSubmit} className="space-y-8 w-80 lg:w-120">
      {isNewRoom && <input type="hidden" name="isNewRoom" value="true" />}
      <InputField
        label={label}
        name={name}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={customItem}
        onChange={(value) => setCustomItem(value)}
      />
      <ToastButton
        toastMessage={toastMessage}
        toastColor={toastColor}
        redirect={redirect}
      >
        {isPending ? "設定中..." : "設定"}
      </ToastButton>
    </Form>
  );
};

export default CustomForm;
