"use client";

import ScoreForm from "@/src/components/form/rooms/ScoreForm";
import ChipForm from "@/src/components/form/rooms/ChipForm";
import Keyboard from "@/src/components/form/rooms/Keyboard";
import type {
  ReadScore,
  ReadChip,
  ReadRoomDetail,
} from "@/src/lib/models/rooms/type";
import { useSelect } from "@/src/hooks/rooms/useSelection";
import { useScoreEditor } from "@/src/hooks/rooms/useScoreEditor";

interface ScoreChipFormProps {
  scores: ReadScore[];
  chips: ReadChip[];
  roomDetail: ReadRoomDetail;
}

const ScoreChipForm = ({ scores, chips, roomDetail }: ScoreChipFormProps) => {
  const { select, open, close, left, right } = useSelect();
  const { setScore, getScore } = useScoreEditor(scores);

  const onSetScore = (newScore: number) => {
    if (!select) return;
    setScore(select.gameCount, select.playerIndex, newScore);
  };

  return (
    <>
      <ScoreForm
        scores={scores}
        initialPoint={roomDetail.initialPoint}
        roomId={roomDetail.id}
        select={select}
        open={open}
        getScore={getScore}
      />
      <ChipForm
        chips={chips}
        chipRate={roomDetail.chipRate}
        roomId={roomDetail.id}
      />
      {select !== null && (
        <Keyboard
          select={select}
          close={close}
          left={left}
          right={right}
          value={getScore(select.gameCount, select.playerIndex)}
          setValue={onSetScore}
        />
      )}
    </>
  );
};

export default ScoreChipForm;
