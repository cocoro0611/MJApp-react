"use client";

import Dialog from "./Dialog";
import Button from "../ui/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ToastButton from "@/src/components/nav/ToastButton";
import { useState } from "react";

const DeleteDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        <DeleteOutlineIcon />
      </button>

      <Dialog
        open={open}
        close={handleClose}
        title="確認"
        message="本当に削除しますか？"
      >
        <Button
          type="button"
          onClick={handleClose}
          color="cancel"
          className="w-32"
        >
          キャンセル
        </Button>
        <ToastButton
          alertMessage="削除しました"
          alertColor="success"
          color="danger"
          className="w-32"
        >
          削除する
        </ToastButton>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
