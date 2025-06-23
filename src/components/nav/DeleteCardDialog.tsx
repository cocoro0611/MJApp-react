"use client";

import Dialog from "./Dialog";
import Button from "../ui/Button";
import Card from "@/src/components/ui/Card";
import ToastButton from "@/src/components/nav/ToastButton";
import Form from "next/form";
import { useState } from "react";
import { deleteScore } from "@/src/lib/models/rooms";

interface DeleteCardDialogProps {
  complete: boolean;
  roomId?: string;
  gameCount?: number;
  remainingScore?: number;
}

const DeleteCardDialog = ({
  complete,
  roomId,
  gameCount,
  remainingScore,
}: DeleteCardDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <>
      {complete ? (
        <Card onClick={handleOpen} className="w-full py-3">
          {gameCount}回戦
        </Card>
      ) : (
        <Card
          onClick={handleOpen}
          isColor={false}
          className="p-1.5 font-bold text-xs bg-gray-100 w-full"
        >
          <p>-点数-</p>
          <p className="text-red-500">あと</p>
          <p className="text-red-500">{remainingScore}</p>
        </Card>
      )}

      <Dialog
        open={open}
        close={handleClose}
        title="ゲーム管理"
        message="削除するか、入力値をリセットできます"
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button
            type="button"
            onClick={handleReset}
            color="secondary"
            custom={true}
            className="rounded px-4 w-full"
          >
            リセット
          </Button>

          <Form action={deleteScore}>
            <input type="hidden" name="roomId" value={roomId} />
            <input type="hidden" name="gameCount" value={gameCount} />
            <ToastButton
              alertMessage="削除しました"
              alertColor="success"
              color="danger"
              custom={true}
              className="rounded px-4 py-2 w-full"
            >
              削除する
            </ToastButton>
          </Form>
        </div>

        <Button
          type="button"
          onClick={handleClose}
          color="cancel"
          custom={true}
          className="rounded px-4 py-1 w-full "
        >
          閉じる
        </Button>
      </Dialog>
    </>
  );
};

export default DeleteCardDialog;
