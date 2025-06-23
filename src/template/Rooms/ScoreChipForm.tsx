"use client";

import ScoreForm from "@/src/components/form/rooms/ScoreForm";
import ChipForm from "@/src/components/form/rooms/ChipForm";
import Keyboard from "@/src/components/form/rooms/Keyboard";
import type {
  ReadScore,
  ReadChip,
  ReadRoomDetail,
} from "@/src/lib/models/rooms/type";
import { useSelectedCard } from "@/src/hooks/rooms/useCardSelection";
import { useScoreEditor } from "@/src/hooks/rooms/useScoreEditor";

interface ScoreChipFormProps {
  scores: ReadScore[];
  chips: ReadChip[];
  roomDetail: ReadRoomDetail;
}

const ScoreChipForm = ({ scores, chips, roomDetail }: ScoreChipFormProps) => {
  const { selectedCard, onOpen, onClose, moveLeft, moveRight } =
    useSelectedCard();
  const { updateScore, getScore } = useScoreEditor(scores);

  const handleScoreUpdate = (newScore: number) => {
    if (!selectedCard) return;
    updateScore(selectedCard.gameCount, selectedCard.playerIndex, newScore);
  };

  return (
    <>
      <ScoreForm
        scores={scores}
        initialPoint={roomDetail.initialPoint}
        roomId={roomDetail.id}
        selectedCard={selectedCard}
        onOpen={onOpen}
        getScore={getScore}
      />
      <ChipForm
        chips={chips}
        chipRate={roomDetail.chipRate}
        roomId={roomDetail.id}
      />
      {selectedCard !== null && (
        <Keyboard
          selectedCard={selectedCard}
          onClose={onClose}
          moveLeft={moveLeft}
          moveRight={moveRight}
          currentScore={getScore(
            selectedCard.gameCount,
            selectedCard.playerIndex
          )}
          onScoreUpdate={handleScoreUpdate}
        />
      )}
    </>
  );
};

export default ScoreChipForm;
