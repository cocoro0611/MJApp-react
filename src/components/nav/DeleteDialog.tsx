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
            type="button"
            onClick={handleClose}
            color="cancel"
            custom={true}
            className="rounded px-4 py-2 w-full"
          >
            キャンセル
          </Button>
          <ToastButton
            alertMessage="削除しました"
            alertColor="success"
            color="danger"
            custom={true}
            className="rounded px-4 py-2 w-full"
          >
            削除する
          </ToastButton>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
