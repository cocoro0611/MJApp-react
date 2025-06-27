import { useState } from "react";
import type { TiedScore } from "@/src/lib/models/rooms/actions/read/read-tied-scores";

export const useOrderEdit = (initialScores: TiedScore[]) => {
  const [orderedScores, setOrderedScores] = useState(initialScores);

  // ドラッグ&ドロップで順位変更
  const movePlayer = (fromIndex: number, toIndex: number) => {
    const newOrder = [...orderedScores];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    setOrderedScores(newOrder);
  };

  // 上に移動
  const moveUp = (index: number) => {
    if (index > 0) {
      movePlayer(index, index - 1);
    }
  };

  // 下に移動
  const moveDown = (index: number) => {
    if (index < orderedScores.length - 1) {
      movePlayer(index, index + 1);
    }
  };

  // リセット
  const resetOrder = () => {
    setOrderedScores(initialScores);
  };

  return {
    orderedScores,
    movePlayer,
    moveUp,
    moveDown,
    resetOrder,
  };
};
