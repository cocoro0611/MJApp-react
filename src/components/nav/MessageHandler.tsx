"use client";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";

type MessageType = "user" | "room";

interface MessageConfig {
  deleted: string;
  failed: string;
}

const messageConfigs: Record<MessageType, MessageConfig> = {
  user: {
    deleted: "ユーザーが削除されました",
    failed: "ユーザーの削除に失敗しました",
  },
  room: {
    deleted: "ルームが削除されました",
    failed: "ルームの削除に失敗しました",
  },
};

// useSearchParamsを使う部分を分離
const MessageContent = ({ type }: { type: MessageType }) => {
  const searchParams = useSearchParams();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );

  const config = messageConfigs[type];

  useEffect(() => {
    const message = searchParams.get("message");
    const error = searchParams.get("error");

    if (message === "deleted") {
      setToastMessage(config.deleted);
      setToastSeverity("success");
      setToastOpen(true);
    } else if (error === "failed") {
      setToastMessage(config.failed);
      setToastSeverity("error");
      setToastOpen(true);
    }

    // URLからパラメータを削除
    if (message || error) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams, config]);

  return (
    <Snackbar
      open={toastOpen}
      autoHideDuration={TOAST_TIME}
      onClose={() => setToastOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={toastSeverity} variant="filled" className="z-20">
        {toastMessage}
      </Alert>
    </Snackbar>
  );
};

// Suspenseで囲んだメインコンポーネント
interface MessageHandlerProps {
  type: MessageType;
}

const MessageHandler = ({ type }: MessageHandlerProps) => {
  return (
    <Suspense fallback={null}>
      <MessageContent type={type} />
    </Suspense>
  );
};

export default MessageHandler;
