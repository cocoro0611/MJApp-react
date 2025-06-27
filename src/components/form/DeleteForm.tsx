"use client";

import Form from "next/form";
import Dialog from "../nav/Dialog";
import Button from "../ui/Button";
import ToastButton from "@/src/components/nav/ToastButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDialog } from "@/src/hooks/ui/useDialog";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import type { ServerAction } from "@/src/hooks/ui/useServerActionToast";

interface DeleteFormProps {
  action: ServerAction;
  name: string;
  value: string;
}

const DeleteForm = ({ action, name, value }: DeleteFormProps) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(action);

  return (
    <>
      <div onClick={openDialog}>
        <DeleteOutlineIcon />
      </div>

      <Dialog
        open={isOpen}
        close={closeDialog}
        title="削除の確認"
        message="本当に削除しますか？"
      >
        <Form action={handleSubmit}>
          <input type="hidden" name={name} value={value} />

          <div className="grid grid-cols-2 gap-4">
            <Button color="cancel" onClick={closeDialog}>
              キャンセル
            </Button>
            <ToastButton
              color="danger"
              toastMessage={toastMessage}
              toastColor={toastColor}
              redirect={redirect}
            >
              {isPending ? "削除中..." : "削除する"}
            </ToastButton>
          </div>
        </Form>
      </Dialog>
    </>
  );
};

export default DeleteForm;
