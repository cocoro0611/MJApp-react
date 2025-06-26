"use client";

import Dialog from "./Dialog";
import Button from "../ui/Button";
import Card from "@/src/components/ui/Card";
import ToastButton from "@/src/components/nav/ToastButton";
import Form from "next/form";
import { useState } from "react";
import { deleteScore } from "@/src/lib/models/rooms";

interface DeleteScoreDialogProps {
  complete: boolean;
  roomId?: string;
  gameCount?: number;
  remaining?: number;
}

const DeleteScoreDialog = ({
  complete,
  roomId,
  gameCount,
  remaining,
}: DeleteScoreDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReset = () => window.location.reload();

  const ResetButton = () => (
    <Button color="toggle-active" onClick={handleReset}>
      やり直し
    </Button>
  );

  const CancelButton = () => (
    <Button color="cancel" onClick={handleClose}>
      キャンセル
    </Button>
  );

  const DeleleButton = () => (
    <Form action={deleteScore}>
      <input type="hidden" name="roomId" value={roomId} />
      <input type="hidden" name="gameCount" value={gameCount} />
      <ToastButton
        color="danger"
        type="submit"
        alertMessage="削除しました"
        onClick={() => {
          // 削除後ダイアログがCloseしない時があるので強制的に閉じる
          setTimeout(() => setOpen(false), 700);
        }}
      >
        削除する
      </ToastButton>
    </Form>
  );

  return (
    <>
      <Card
        onClick={handleOpen}
        isColor={complete}
        className={
          complete
            ? "w-full py-3"
            : "p-1.5 font-bold text-xs bg-gray-100 w-full"
        }
      >
        {complete ? (
          <>{gameCount}回戦</>
        ) : (
          <>
            <p>-点数-</p>
            <p className="text-negative">あと</p>
            <p className="text-negative">{remaining}</p>
          </>
        )}
      </Card>

      <Dialog
        open={open}
        close={handleClose}
        title={complete ? "削除の確認" : "データの操作"}
        message={complete ? "本当に削除しますか？" : "この情報をどうしますか？"}
      >
        {complete ? (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <CancelButton />
            <DeleleButton />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <ResetButton />
              <DeleleButton />
            </div>
            <CancelButton />
          </>
        )}
      </Dialog>
    </>
  );
};

export default DeleteScoreDialog;
