"use client";

import Form from "next/form";
import Dialog from "../nav/Dialog";
import Button from "../ui/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDialog } from "@/src/hooks/ui/useDialog";
import { useTransition } from "react";

interface DeleteFormProps {
  action: (formData: FormData) => Promise<never>; // redirectするので戻り値なし
  name: string;
  value: string;
}

const DeleteForm = ({ action, name, value }: DeleteFormProps) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await action(formData);
    });
  };

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
            <Button color="cancel" border="cancel-border" onClick={closeDialog}>
              キャンセル
            </Button>
            <Button type="submit" color="danger">
              {isPending ? "削除中..." : "削除する"}
            </Button>
          </div>
        </Form>
      </Dialog>
    </>
  );
};

export default DeleteForm;
