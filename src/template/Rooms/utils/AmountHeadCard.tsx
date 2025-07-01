"use client";

import Form from "next/form";
import Dialog from "../../../components/nav/Dialog";
import Button from "../../../components/ui/Button";
import ToastButton from "@/src/components/nav/ToastButton";
import Card from "@/src/components/ui/Card";
import { useDialog } from "@/src/hooks/ui/useDialog";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { deleteAmount } from "@/src/lib/models/rooms";

interface AmountHeadCardProps {
  roomId: string;
  amount: number;
}

const AmountHeadCard = ({ roomId, amount }: AmountHeadCardProps) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const {
    isPending,
    toastMessage,
    toastColor,
    redirect,
    resetToast,
    handleSubmit,
  } = useServerActionToast(deleteAmount);

  const handleOpenDialog = () => {
    resetToast();
    openDialog();
  };

  return (
    <>
      <Card onClick={handleOpenDialog} className="w-full py-1">
        <div className="font-bold text-xs">
          <p>-合計-</p>
          <p>{amount} P</p>
        </div>
      </Card>

      <Dialog
        open={isOpen}
        close={closeDialog}
        title="削除の確認"
        message="本当に削除しますか？"
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button color="cancel" onClick={closeDialog}>
            キャンセル
          </Button>
          <Form action={handleSubmit}>
            <input type="hidden" name="roomId" value={roomId} />
            <ToastButton
              color="danger"
              toastMessage={toastMessage}
              toastColor={toastColor}
              redirect={redirect}
              onToastClose={closeDialog}
            >
              {isPending ? "削除中..." : "削除する"}
            </ToastButton>
          </Form>
        </div>
      </Dialog>
    </>
  );
};

export default AmountHeadCard;
