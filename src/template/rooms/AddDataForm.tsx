"use client";

import Form from "next/form";
import Dialog from "@/src/components/nav/Dialog";
import Button from "@/src/components/ui/Button";
import ButtonFixed from "@/src/components/ui/ButtonFixed";
import ToastButton from "@/src/components/nav/ToastButton";
import { useDialog } from "@/src/hooks/ui/useDialog";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { createScore, createChip } from "@/src/lib/models/rooms";

interface AddDataFormProps {
  roomId: string;
}

const AddDataForm = ({ roomId }: AddDataFormProps) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const scoreAction = useServerActionToast(createScore);
  const chipAction = useServerActionToast(createChip);

  const handleOpenDialog = () => {
    scoreAction.resetToast?.();
    chipAction.resetToast?.();
    openDialog();
  };

  return (
    <>
      <ButtonFixed onClick={handleOpenDialog} />

      <Dialog
        open={isOpen}
        close={closeDialog}
        title="情報を追加"
        message="どちらの情報を追加しますか？"
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Form action={scoreAction.handleSubmit}>
            <input type="hidden" name="roomId" value={roomId} />
            <ToastButton
              toastMessage={scoreAction.toastMessage}
              toastColor={scoreAction.toastColor}
              redirect={scoreAction.redirect}
              onToastClose={closeDialog}
            >
              {scoreAction.isPending ? "処理中..." : "スコア"}
            </ToastButton>
          </Form>
          <Form action={chipAction.handleSubmit}>
            <input type="hidden" name="roomId" value={roomId} />
            <ToastButton
              toastMessage={chipAction.toastMessage}
              toastColor={chipAction.toastColor}
              redirect={chipAction.redirect}
              onToastClose={closeDialog}
            >
              {chipAction.isPending ? "処理中..." : "チップ"}
            </ToastButton>
          </Form>
        </div>
        <Button color="cancel" onClick={closeDialog}>
          キャンセル
        </Button>
      </Dialog>
    </>
  );
};

export default AddDataForm;
