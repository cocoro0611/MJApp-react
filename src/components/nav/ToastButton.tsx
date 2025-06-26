"use client";

import Button from "../ui/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ReactNode, useState } from "react";
import { TOAST_TIME } from "@/src/constants/toastTime";

interface ToastButtonProps {
  children: ReactNode;
  href?: string;
  color?:
    | "primary"
    | "secondary"
    | "danger"
    | "cancel"
    | "white"
    | "toggle-active"
    | "toggle-inactive";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  // message関係
  alertMessage: string;
  alertColor?: "error" | "info" | "success" | "warning";
}

const ToastButton = ({
  children,
  href,
  color = "primary",
  type = "button",
  disabled = false,
  className = "rounded px-4 py-2 w-full", // defaultのsize
  onClick,
  // message関係
  alertMessage,
  alertColor = "success",
}: ToastButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    // 外部から渡されたonClickがあれば実行
    if (onClick) {
      onClick();
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Button
        href={href}
        color={color}
        type={type}
        disabled={disabled}
        className={className}
        onClick={handleClick}
      >
        {children}
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={TOAST_TIME}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertColor}
          variant="filled"
          className="z-20"
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToastButton;
