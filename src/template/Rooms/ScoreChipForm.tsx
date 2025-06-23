"use client";

import { useState } from "react";
import ScoreForm from "@/src/components/form/rooms/ScoreForm";
import ChipForm from "@/src/components/form/rooms/ChipForm";
import Keyboard from "@/src/components/form/rooms/Keyboard";
import type {
  ReadScore,
  ReadChip,
  ReadRoomDetail,
} from "@/src/lib/models/rooms/type";
import { useSelectedCard } from "@/src/hooks/useSelectedCard";

interface ScoreChipFormProps {
  scores: ReadScore[];
  chips: ReadChip[];
  roomDetail: ReadRoomDetail;
}

const ScoreChipForm = ({ scores, chips, roomDetail }: ScoreChipFormProps) => {
  const { selectedCard, onClick, onClose, onLeft, onRight } = useSelectedCard();
  const [editScores, setEditScores] = useState<{ [key: string]: number }>({});

  const updateScore = (updateScore: number) => {
    const key = `${selectedCard?.gameCount}-${selectedCard?.playerIndex}`;
    setEditScores((prev) => ({ ...prev, [key]: updateScore }));
  };

  const getScore = (gameCount: number, playerIndex: number) => {
    const key = `${gameCount}-${playerIndex}`;

    // 編集中の値があればそれを返す
    if (editScores[key] !== undefined) {
      return editScores[key];
    } else {
      // なければ元の値を返す
      const gameScore = scores.find((s) => s.gameCount === gameCount);
      const scoreItem = gameScore?.scores[playerIndex];

      return scoreItem ? scoreItem.score : 0;
    }
  };

  return (
    <>
      <ScoreForm
        scores={scores}
        initialPoint={roomDetail.initialPoint}
        roomId={roomDetail.id}
        selectedCard={selectedCard}
        onClick={onClick}
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
          onLeft={onLeft}
          onRight={onRight}
          currentScore={getScore(
            selectedCard.gameCount,
            selectedCard.playerIndex
          )}
          onScoreUpdate={updateScore}
        />
      )}
    </>
  );
};

export default ScoreChipForm;
