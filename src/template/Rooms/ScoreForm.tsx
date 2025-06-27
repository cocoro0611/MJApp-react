"use client";

import Form from "next/form";
import Button from "@/src/components/ui/Button";
import ToastButton from "@/src/components/nav/ToastButton";
import ScoreBoard from "./utils/ScoreBoard";
import Keyboard from "./utils/Keyboard";
import { useSelect } from "@/src/hooks/rooms/useSelection";
import { useScoreEditor } from "@/src/hooks/rooms/useScoreEditor";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { useAutoScroll } from "@/src/hooks/rooms/useAutoScroll";
import { updateScore } from "@/src/lib/models/rooms";
import type { ReadScore } from "@/src/lib/models/rooms/type";

interface ScoreFormProps {
  scores: ReadScore[];
  roomId: string;
  roomInitialPoint: number;
}

const ScoreForm = ({ scores, roomId, roomInitialPoint }: ScoreFormProps) => {
  const { selected, openSelect, closeSelect, moveLeft, moveRight } =
    useSelect();
  const {
    isPending,
    toastMessage,
    toastColor,
    redirect,
    resetToast,
    handleSubmit,
  } = useServerActionToast(updateScore);
  const { editScore, getScore, getRemainingScore, isCompleteScore } =
    useScoreEditor(scores, roomInitialPoint);

  // 自動スクロール機能
  useAutoScroll({ selected, scores });

  const handleScoreChange = (newScore: number) => {
    if (!selected) return;
    editScore(selected.gameCount, selected.index, newScore);
  };

  const handleToastClose = () => {
    resetToast();
    closeSelect();
  };

  if (scores.length === 0) {
    return null;
  }

  return (
    <>
      <ScoreBoard
        scores={scores}
        roomId={roomId}
        selected={selected}
        onOpen={openSelect}
        getScore={getScore}
        getRemaining={getRemainingScore}
        isComplete={isCompleteScore}
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
                name={`score-${index}`}
                value={Math.round(getScore(selected.gameCount, index))}
              />
            ))}
          <div className="h-47" /> {/* キーボードの高さ調整 */}
          <Keyboard
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            value={getScore(selected.gameCount, selected.index)}
            onValueChange={handleScoreChange}
            maxLength={4}
          >
            <ToastButton
              disabled={!isCompleteScore(selected.gameCount)}
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
              className="rounded text-sm w-16"
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

export default ScoreForm;
