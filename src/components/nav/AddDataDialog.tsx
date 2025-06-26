"use client";

import Form from "next/form";
import Dialog from "./Dialog";
import Button from "../ui/Button";
import ToastButton from "@/src/components/nav/ToastButton";
import { useState } from "react";
import { createScore, createChip } from "@/src/lib/models/rooms";

interface AddDataDialogProps {
  roomId: string;
}

const AddDataDialog = ({ roomId }: AddDataDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button color="fixed" onClick={handleOpen} />

      <Dialog
        open={open}
        close={handleClose}
        title="情報を追加"
        message="どちらの情報を追加しますか？"
      >
        <div className="grid grid-cols-2  gap-4 mb-4">
          <Form action={createScore}>
            <input type="hidden" name="roomId" value={roomId} />
            <ToastButton type="submit" alertMessage="スコアを追加しました">
              スコア
            </ToastButton>
          </Form>
          <Form action={createChip}>
            <input type="hidden" name="roomId" value={roomId} />
            <ToastButton type="submit" alertMessage="チップを追加しました">
              チップ
            </ToastButton>
          </Form>
        </div>
        <Button color="cancel" onClick={handleClose}>
          キャンセル
        </Button>
      </Dialog>
    </>
  );
};

export default AddDataDialog;
