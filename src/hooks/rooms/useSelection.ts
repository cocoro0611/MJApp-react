"use client";

import { useState } from "react";

export const useSelect = () => {
  const [select, setSelect] = useState<{
    gameCount: number;
    playerIndex: number;
  } | null>(null);

  const open = (gameCount: number, playerIndex: number) => {
    setSelect({ gameCount, playerIndex });
  };

  const close = () => {
    setSelect(null);
  };

  const left = () => {
    if (!select) return;
    const newIndex = select.playerIndex === 0 ? 3 : select.playerIndex - 1;
    setSelect({ ...select, playerIndex: newIndex });
  };

  const right = () => {
    if (!select) return;
    const newIndex = select.playerIndex === 3 ? 0 : select.playerIndex + 1;
    setSelect({ ...select, playerIndex: newIndex });
  };

  return {
    select,
    open,
    close,
    left,
    right,
  };
};
