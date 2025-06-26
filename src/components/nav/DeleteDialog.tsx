"use client";

import Dialog from "./Dialog";
import Button from "../ui/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ToastButton from "@/src/components/nav/ToastButton";
import { useState } from "react";

const DeleteDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div onClick={handleOpen}>
        <DeleteOutlineIcon />
      </div>

      <Dialog
        open={open}
        close={handleClose}
        title="削除の確認"
        message="本当に削除しますか？"
      >
        <div className="grid grid-cols-2 gap-4">
          <Button
            color="cancel"
            className="rounded px-4 py-2"
            onClick={handleClose}
          >
            キャンセル
          </Button>
          <ToastButton
            color="danger"
            type="submit"
            className="rounded px-4 py-2"
            alertMessage="削除しました"
          >
            削除する
          </ToastButton>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
