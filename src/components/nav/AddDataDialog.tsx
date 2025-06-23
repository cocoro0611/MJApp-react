"use client";

import Form from "next/form";
import Dialog from "./Dialog";
import ButtonFixed from "@/src/components/ui/ButtonFixed";
import Button from "../ui/Button";
import ToastButton from "@/src/components/nav/ToastButton";
import { useState } from "react";
import { createScore, createChip } from "@/src/lib/models/rooms";

interface AddDataDialogProps {
  roomId: string;
}

const AddDataDialog = ({ roomId }: AddDataDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleOpen}>
        <ButtonFixed />
      </div>

      <Dialog
        open={open}
        close={handleClose}
        title="追加"
        message="以下の情報を追加しますか？"
      >
        <div className="grid grid-cols-2  gap-4 mb-4">
          <Form action={createScore}>
            <input type="hidden" name="roomId" value={roomId} />
            <ToastButton
              alertMessage="スコアを追加しました"
              alertColor="success"
              custom={true}
              className="rounded px-4 py-2 w-full"
            >
              スコア
            </ToastButton>
          </Form>
          <Form action={createChip}>
            <input type="hidden" name="roomId" value={roomId} />
            <ToastButton
              alertMessage="チップを追加しました"
              alertColor="success"
              custom={true}
              className="rounded px-4 py-2 w-full"
            >
              チップ
            </ToastButton>
          </Form>
        </div>
        <Button
          type="button"
          onClick={handleClose}
          color="cancel"
          custom={true}
          className="rounded px-4 py-1 w-full"
        >
          閉じる
        </Button>
      </Dialog>
    </>
  );
};

export default AddDataDialog;
