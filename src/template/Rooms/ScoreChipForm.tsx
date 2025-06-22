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

interface ScoreChipFormProps {
  scores: ReadScore[];
  chips: ReadChip[];
  roomDetail: ReadRoomDetail;
}

const ScoreChipForm = ({ scores, chips, roomDetail }: ScoreChipFormProps) => {
  const [selectedCard, setSelectedCard] = useState<{
    gameCount: number;
    playerIndex: number;
  } | null>(null);

  // 編集中のスコアの状態管理
  const [editingScores, setEditingScores] = useState<{
    [key: string]: number;
  }>({});

  const onClick = (gameCount: number, playerIndex: number) => {
    setSelectedCard({ gameCount, playerIndex });
  };

  const onClose = () => {
    setSelectedCard(null);
  };

  const onLeft = () => {
    if (!selectedCard) return;

    const newIndex =
      selectedCard.playerIndex === 0 ? 3 : selectedCard.playerIndex - 1;
    setSelectedCard({
      ...selectedCard,
      playerIndex: newIndex,
    });
  };

  const onRight = () => {
    if (!selectedCard) return;

    const newIndex =
      selectedCard.playerIndex === 3 ? 0 : selectedCard.playerIndex + 1;
    setSelectedCard({
      ...selectedCard,
      playerIndex: newIndex,
    });
  };

  // FIXME: なぜ動くのか不明
  const getCurrentScore = () => {
    if (!selectedCard) return 0;

    // まず編集中の値があるかチェック
    const key = `${selectedCard.gameCount}-${selectedCard.playerIndex}`;
    if (editingScores[key] !== undefined) {
      return editingScores[key];
    }

    // なければ元の値を返す
    const gameScore = scores.find(
      (s) => s.gameCount === selectedCard.gameCount
    );
    if (!gameScore) return 0;

    const scoreItem = gameScore.scores[selectedCard.playerIndex];
    return scoreItem ? scoreItem.score : 0;
  };

  // キーボードからスコア値を更新する関数
  const updateScore = (newScore: number) => {
    if (!selectedCard) return;

    const key = `${selectedCard.gameCount}-${selectedCard.playerIndex}`;
    setEditingScores((prev) => ({
      ...prev,
      [key]: newScore,
    }));
  };

  // 表示用のスコア値を取得する関数
  const getDisplayScore = (gameCount: number, playerIndex: number) => {
    const key = `${gameCount}-${playerIndex}`;
    if (editingScores[key] !== undefined) {
      return editingScores[key];
    }

    const gameScore = scores.find((s) => s.gameCount === gameCount);
    if (!gameScore) return 0;

    const scoreItem = gameScore.scores[playerIndex];
    return scoreItem ? scoreItem.score : 0;
  };

  return (
    <>
      <ScoreForm
        scores={scores}
        initialPoint={roomDetail.initialPoint}
        roomId={roomDetail.id}
        selectedCard={selectedCard}
        onClick={onClick}
        getDisplayScore={getDisplayScore} // 表示用スコア取得関数を渡す
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
          currentScore={getCurrentScore()}
          onScoreUpdate={updateScore} // スコア更新関数を渡す
        />
      )}
    </>
  );
};

export default ScoreChipForm;
