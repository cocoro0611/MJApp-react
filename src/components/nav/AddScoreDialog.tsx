"use client";

import Dialog from "./Dialog";
import ButtonFixed from "@/src/components/ui/ButtonFixed";
import Button from "../ui/Button";
import ToastButton from "@/src/components/nav/ToastButton";
import { useState } from "react";

const AddScoreDialog = () => {
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
        <ButtonFixed href="" />
      </button>

      <Dialog
        open={open}
        close={handleClose}
        title="追加"
        message="以下の情報を追加しますか？"
      >
        <Button
          type="button"
          onClick={handleClose}
          color="cancel"
          className="w-32"
        >
          閉じる
        </Button>
        <ToastButton
          alertMessage="スコアを追加しました"
          alertColor="success"
          className="w-32"
        >
          スコア
        </ToastButton>
        <ToastButton
          alertMessage="チップを追加しました"
          alertColor="success"
          className="w-32"
        >
          チップ
        </ToastButton>
      </Dialog>
    </>
  );
};

export default AddScoreDialog;
