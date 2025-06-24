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
  const { select, open, close, left, right } = useSelect();
  const { setScore, getScore, getRemainingScore, isComplete } = useScoreEditor(
    scores,
    roomDetail.initialPoint
  );

  const onSetScore = (newScore: number) => {
    if (!select) return;
    setScore(select.gameCount, select.playerIndex, newScore);
  };

  return (
    <>
      <ScoreForm
        scores={scores}
        roomId={roomDetail.id}
        select={select}
        open={open}
        getScore={getScore}
        getRemainingScore={getRemainingScore}
        isComplete={isComplete}
      />
      <ChipForm
        chips={chips}
        chipRate={roomDetail.chipRate}
        roomId={roomDetail.id}
      />
      {select !== null && (
        <Form action={updateScore}>
          <input type="hidden" name="roomId" value={roomDetail.id} />
          <input
            type="hidden"
            name="gameCount"
            value={select?.gameCount || ""}
          />
          {select &&
            [0, 1, 2, 3].map((index) => (
              <input
                key={`player-${index}`}
                type="hidden"
                name={`score-${index}`}
                value={Math.round(getScore(select.gameCount, index))}
              />
            ))}
          <div className="h-47" /> {/* キーボード高さの調整 */}
          <Keyboard
            select={select}
            close={close}
            left={left}
            right={right}
            value={getScore(select.gameCount, select.playerIndex)}
            setValue={onSetScore}
            isComplete={isComplete(select.gameCount)}
            maxLength={4}
          />
        </Form>
      )}
    </>
  );
};

export default DataForm;
