"use client";

import { useState } from "react";

export const useSelect = () => {
  const [select, setSelect] = useState<{
    gameCount: number;
    playerIndex: number;
  } | null>(null);

  const open = (gameCount: number, playerIndex: number) => {
    setSelect({ gameCount, playerIndex });

    // gameCountが4以上の時、少し遅延を入れてスクロール
    if (gameCount >= 4) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 300); // 300ms
    }
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

  return { select, open, close, left, right };
};
