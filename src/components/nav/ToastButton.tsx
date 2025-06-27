"use client";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { TOAST_TIME } from "@/src/constants/toastTime";

interface ToastButtonProps {
  children: ReactNode;
  color?: "primary" | "secondary" | "danger" | "cancel" | "white";
  disabled?: boolean;
  className?: string;
  // toast関係
  toastMessage: string;
  toastColor: "error" | "info" | "success" | "warning";
  redirect: string;
  onToastClose?: () => void;
}

const ToastButton = ({
  children,
  color = "primary",
  disabled = false,
  className = "rounded px-4 py-2 w-full", // defaultのsize
  // toast関係
  toastMessage,
  toastColor = "success",
  redirect,
  onToastClose,
}: ToastButtonProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (toastMessage) {
      setOpen(true);
    }
  }, [toastMessage]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // Toast以外の場所をクリックした時は閉じない
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);

    if (onToastClose) {
      onToastClose();
    }

    if (redirect) {
      router.push(redirect);
    }
  };

  const btnClass = `effect-scale ${color} ${className} ${disabled ? "effect-disabled" : ""} `;
  return (
    <>
      <button type="submit" disabled={disabled} className={btnClass}>
        {children}
      </button>
      {toastMessage && (
        <Snackbar
          open={open}
          autoHideDuration={TOAST_TIME}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={toastColor} variant="filled" className="z-20">
            {toastMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default ToastButton;
