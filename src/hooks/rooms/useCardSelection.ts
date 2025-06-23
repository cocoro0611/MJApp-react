"use client";

import { useState } from "react";

export const useSelectedCard = () => {
  const [selectedCard, setSelectedCard] = useState<{
    gameCount: number;
    playerIndex: number;
  } | null>(null);

  const onOpen = (gameCount: number, playerIndex: number) => {
    setSelectedCard({ gameCount, playerIndex });
  };

  const onClose = () => {
    setSelectedCard(null);
  };

  const moveLeft = () => {
    if (!selectedCard) return;
    const newIndex =
      selectedCard.playerIndex === 0 ? 3 : selectedCard.playerIndex - 1;
    setSelectedCard({ ...selectedCard, playerIndex: newIndex });
  };

  const moveRight = () => {
    if (!selectedCard) return;
    const newIndex =
      selectedCard.playerIndex === 3 ? 0 : selectedCard.playerIndex + 1;
    setSelectedCard({ ...selectedCard, playerIndex: newIndex });
  };

  return {
    selectedCard,
    onOpen,
    onClose,
    moveLeft,
    moveRight,
  };
};
