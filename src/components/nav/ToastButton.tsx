"use client";

import { ReactNode } from "react";
import Button from "../ui/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";

interface ToastButtonProps {
  children: ReactNode;
  alertMessage: string;
  alertColor: "error" | "info" | "success" | "warning";
  color?: "primary" | "secondary" | "danger" | "cancel" | "inactive";
  className?: string;
}

const ToastButton = ({
  children,
  alertMessage,
  alertColor,
  color = "primary",
  className = "",
}: ToastButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
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
      <Button color={color} className={className} onClick={handleClick}>
        {children}
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={alertColor} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToastButton;
