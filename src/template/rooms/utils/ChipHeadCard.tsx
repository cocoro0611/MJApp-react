"use client";

import Form from "next/form";
import Dialog from "../../../components/nav/Dialog";
import Button from "../../../components/ui/Button";
import ToastButton from "@/src/components/nav/ToastButton";
import Card from "@/src/components/ui/Card";
import { useDialog } from "@/src/hooks/ui/useDialog";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { deleteChip } from "@/src/lib/models/rooms";

interface ChipHeadCardProps {
  roomId?: string;
  gameCount?: number;
  remaining?: number;
  complete: boolean;
}

const ChipHeadCard = ({
  roomId,
  gameCount,
  remaining,
  complete,
}: ChipHeadCardProps) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const {
    isPending,
    toastMessage,
    toastColor,
    redirect,
    resetToast,
    handleSubmit,
  } = useServerActionToast(deleteChip);

  const handleOpenDialog = () => {
    resetToast();
    openDialog();
  };

  // completeでボタンの表示を変えたいので関数で定義
  const ResetButton = () => (
    <Button color="toggle-on" onClick={() => window.location.reload()}>
      やり直し
    </Button>
  );

  const CancelButton = () => (
    <Button color="cancel" onClick={closeDialog}>
      キャンセル
    </Button>
  );

  const DeleleButton = () => (
    <Form action={handleSubmit}>
      <input type="hidden" name="roomId" value={roomId} />
      <input type="hidden" name="gameCount" value={gameCount} />
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
  );

  return (
    <>
      <Card
        onClick={handleOpenDialog}
        isColor={complete}
        className={
          complete
            ? "w-full py-1.5"
            : "p-1.5 font-bold text-xs bg-gray-100 w-full"
        }
      >
        {complete ? (
          <>
            {gameCount}回分
            <div className="text-[0.6rem]">(1人/20枚)</div>
          </>
        ) : (
          <>
            <p>-チップ-</p>
            <p className="text-negative">あと</p>
            <p className="text-negative">{remaining}</p>
          </>
        )}
      </Card>

      <Dialog
        open={isOpen}
        close={closeDialog}
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

export default ChipHeadCard;
