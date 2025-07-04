"use client";

import Form from "next/form";
import Button from "@/src/components/ui/Button";
import ToastButton from "@/src/components/nav/ToastButton";
import ChipBoard from "./utils/ChipBoard";
import Keyboard from "./utils/Keyboard";
import { useSelect } from "@/src/hooks/rooms/useSelection";
import { useChipEditor } from "@/src/hooks/rooms/useChipEditor";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { useAutoScroll } from "@/src/hooks/rooms/useAutoScroll";
import { updateChip } from "@/src/lib/models/rooms";
import type { ReadScore, ReadChip } from "@/src/lib/models/rooms/type";

interface ChipFormProps {
  scores: ReadScore[];
  chips: ReadChip[];
  roomId: string;
}

const ChipForm = ({ scores, chips, roomId }: ChipFormProps) => {
  const { selected, openSelect, closeSelect, moveLeft, moveRight } =
    useSelect();
  const {
    isPending,
    toastMessage,
    toastColor,
    redirect,
    resetToast,
    handleSubmit,
  } = useServerActionToast(updateChip);
  const { editChip, getChip, getRemainingChip, isCompleteChip } =
    useChipEditor(chips);

  // 自動スクロール機能
  useAutoScroll({ selected, scores, chips });

  const handleChipChange = (newChip: number) => {
    if (!selected) return;
    editChip(selected.gameCount, selected.index, newChip);
  };

  const handleToastClose = () => {
    resetToast();
    closeSelect();
  };

  if (chips.length === 0) {
    return null;
  }

  return (
    <>
      <ChipBoard
        chips={chips}
        roomId={roomId}
        selected={selected}
        onOpen={openSelect}
        getChip={getChip}
        getRemaining={getRemainingChip}
        isComplete={isCompleteChip}
      />
      {selected !== null && (
        <Form action={handleSubmit}>
          <input type="hidden" name="roomId" value={roomId} />
          <input type="hidden" name="gameCount" value={selected?.gameCount} />
          {selected &&
            [0, 1, 2, 3].map((index) => (
              <input
                key={`player-${index}`}
                type="hidden"
                name={`chip-${index}`}
                value={Math.round(getChip(selected.gameCount, index))}
              />
            ))}
          <div className="h-47" /> {/* キーボードの高さ調整 */}
          <Keyboard
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            value={getChip(selected.gameCount, selected.index)}
            onValueChange={handleChipChange}
            maxLength={2}
          >
            <ToastButton
              disabled={!isCompleteChip(selected.gameCount)}
              toastMessage={toastMessage}
              toastColor={toastColor}
              redirect={redirect}
              onToastClose={handleToastClose}
              className="rounded text-sm w-16"
            >
              {isPending ? "計算中..." : "計算"}
            </ToastButton>
            <Button
              color="cancel"
              className="rounded text-sm w-16 border-2 border-gray-300"
              onClick={closeSelect}
            >
              閉じる
            </Button>
          </Keyboard>
        </Form>
      )}
    </>
  );
};

export default ChipForm;
