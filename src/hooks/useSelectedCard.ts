"use client";

import { useState } from "react";

export const useSelectedCard = () => {
  const [selectedCard, setSelectedCard] = useState<{
    gameCount: number;
    playerIndex: number;
  } | null>(null);

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
    setSelectedCard({ ...selectedCard, playerIndex: newIndex });
  };

  const onRight = () => {
    if (!selectedCard) return;
    const newIndex =
      selectedCard.playerIndex === 3 ? 0 : selectedCard.playerIndex + 1;
    setSelectedCard({ ...selectedCard, playerIndex: newIndex });
  };

  return {
    selectedCard,
    onClick,
    onClose,
    onLeft,
    onRight,
  };
};
