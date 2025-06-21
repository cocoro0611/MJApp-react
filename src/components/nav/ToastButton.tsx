"use client";

import Button from "../ui/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ReactNode, useState } from "react";
import { TOAST_TIME } from "@/src/constants/toastTime";

interface ToastButtonProps {
  children: ReactNode;
  color?: "primary" | "secondary" | "danger" | "cancel" | "white";
  custom?: boolean;
  disabled?: boolean;
  alertMessage: string;
  alertColor: "error" | "info" | "success" | "warning";
  className?: string;
}

const ToastButton = ({
  children,
  alertMessage,
  alertColor,
  color = "primary",
  custom = false,
  disabled = false,
  className = "",
}: ToastButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color={color}
        disabled={disabled}
        custom={custom}
        className={className}
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
