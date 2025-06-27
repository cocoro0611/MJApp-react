import { useState, useTransition } from "react";

interface ServerActionResult {
  success: boolean;
  message: string;
  redirect: string;
}

export type ServerAction = (formData: FormData) => Promise<ServerActionResult>;

export const useServerActionToast = (action: ServerAction) => {
  const [isPending, startTransition] = useTransition(); // resultのtry,catchどちらも取得できる
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "error">("success");
  const [redirect, setRedirect] = useState("");

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await action(formData);

        setToastMessage(result.message);
        setToastColor(result.success ? "success" : "error");
        setRedirect(result.redirect);
      } catch (_error) {
        setToastMessage("予期しないエラーが発生しました");
        setToastColor("error");
        setRedirect("");
      }
    });
  };

  const resetToast = () => {
    setToastMessage("");
    setToastColor("success");
    setRedirect("");
  };

  return {
    isPending,
    toastMessage,
    toastColor,
    redirect,
    handleSubmit,
    resetToast,
  };
};
