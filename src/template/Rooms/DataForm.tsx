"use client";

import ScoreForm from "@/src/components/form/rooms/ScoreForm";
import ChipForm from "@/src/components/form/rooms/ChipForm";
import Keyboard from "@/src/components/form/rooms/Keyboard";
import Form from "next/form";
import type {
  ReadScore,
  ReadChip,
  ReadRoomDetail,
} from "@/src/lib/models/rooms/type";
import { useSelect } from "@/src/hooks/rooms/useSelection";
import { useScoreEditor } from "@/src/hooks/rooms/useScoreEditor";
import { updateScore } from "@/src/lib/models/rooms";

interface DataFormProps {
  scores: ReadScore[];
  chips: ReadChip[];
  roomDetail: ReadRoomDetail;
}

const DataForm = ({ scores, chips, roomDetail }: DataFormProps) => {
  const { selected, openSelect, closeSelect, moveLeft, moveRight } =
    useSelect();
  const {
    updateScore: editScore,
    getScore,
    getRemaining,
    isComplete,
  } = useScoreEditor(scores, roomDetail.initialPoint);

  const handleScoreChange = (newScore: number) => {
    if (!selected || selected.type !== "score") return;
    editScore(selected.gameCount, selected.index, newScore);
  };

  // スコア選択時のみキーボードを表示
  const isScoreSelected = selected !== null && selected.type === "score";

  return (
    <>
      <ScoreForm
        scores={scores}
        roomId={roomDetail.id}
        selected={selected}
        onOpen={openSelect}
        getScore={getScore}
        getRemaining={getRemaining}
        isComplete={isComplete}
      />
      <ChipForm
        chips={chips}
        chipRate={roomDetail.chipRate}
        roomId={roomDetail.id}
      />
      {isScoreSelected && (
        <Form action={updateScore}>
          <input type="hidden" name="roomId" value={roomDetail.id} />
          <input
            type="hidden"
            name="gameCount"
            value={selected?.gameCount || ""}
          />
          {selected &&
            [0, 1, 2, 3].map((index) => (
              <input
                key={`player-${index}`}
                type="hidden"
                name={`score-${index}`}
                value={Math.round(getScore(selected.gameCount, index))}
              />
            ))}
          <div className="h-47" />
          <Keyboard
            selected={selected}
            onClose={closeSelect}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            value={getScore(selected.gameCount, selected.index)}
            onValueChange={handleScoreChange}
            isComplete={isComplete(selected.gameCount)}
            maxLength={4}
          />
        </Form>
      )}
    </>
  );
};

export default DataForm;
