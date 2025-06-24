"use client";

import { useState } from "react";

export type SelectType = "score" | "chip";

export interface SelectState {
  gameCount: number;
  index: number;
  type: SelectType;
}

export const useSelect = () => {
  const [selected, setSelected] = useState<SelectState | null>(null);

  const openSelect = (
    gameCount: number,
    index: number,
    type: SelectType = "score"
  ) => {
    setSelected({ gameCount, index, type });
  };

  const closeSelect = () => {
    setSelected(null);
  };

  const moveLeft = () => {
    if (!selected) return;
    const newIndex = selected.index === 0 ? 3 : selected.index - 1;
    setSelected({ ...selected, index: newIndex });
  };

  const moveRight = () => {
    if (!selected) return;
    const newIndex = selected.index === 3 ? 0 : selected.index + 1;
    setSelected({ ...selected, index: newIndex });
  };

  return {
    selected,
    openSelect,
    closeSelect,
    moveLeft,
    moveRight,
  };
};
