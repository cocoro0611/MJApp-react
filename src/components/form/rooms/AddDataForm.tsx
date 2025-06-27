"use client";

import Form from "next/form";
import Dialog from "../../nav/Dialog";
import Button from "../../ui/Button";
import ButtonFixed from "../../ui/ButtonFixed";
import ToastButton from "@/src/components/nav/ToastButton";
import { useDialog } from "@/src/hooks/ui/useDialog";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { createScore, createChip } from "@/src/lib/models/rooms";

interface AddDataFormProps {
  roomId: string;
}

const AddDataForm = ({ roomId }: AddDataFormProps) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(createScore);

  return (
    <>
      <ButtonFixed onClick={openDialog} />

      <Dialog
        open={isOpen}
        close={closeDialog}
        title="情報を追加"
        message="どちらの情報を追加しますか？"
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Form action={handleSubmit}>
            <input type="hidden" name="roomId" value={roomId} />
            <ToastButton
              toastMessage={toastMessage}
              toastColor={toastColor}
              redirect={redirect}
            >
              {isPending ? "処理中..." : "スコア"}
            </ToastButton>
          </Form>
          {/* <Form action={handleChipSubmit}>
            <input type="hidden" name="roomId" value={roomId} />
            <ToastButton
              toastMessage={chipAction.toastMessage}
              toastColor={chipAction.toastColor}
              redirect={chipAction.redirect}
            >
              チップ
            </ToastButton>
          </Form> */}
        </div>
        <Button color="cancel" onClick={closeDialog}>
          キャンセル
        </Button>
      </Dialog>
    </>
  );
};

export default AddDataForm;
