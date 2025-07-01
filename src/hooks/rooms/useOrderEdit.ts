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

  // 上に移動可能かチェック
  const canMoveUp = (index: number): boolean => {
    if (index === 0) return false;

    const currentScore = orderedScores[index].score;
    const upperScore = orderedScores[index - 1].score;

    // 上のプレイヤーのスコアが大きい場合は移動不可
    return currentScore >= upperScore;
  };

  // 下に移動可能かチェック
  const canMoveDown = (index: number): boolean => {
    if (index === orderedScores.length - 1) return false;

    const currentScore = orderedScores[index].score;
    const lowerScore = orderedScores[index + 1].score;

    // 下のプレイヤーのスコアが小さい場合は移動不可
    return currentScore <= lowerScore;
  };

  // 上に移動
  const moveUp = (index: number) => {
    if (canMoveUp(index)) {
      movePlayer(index, index - 1);
    }
  };

  // 下に移動
  const moveDown = (index: number) => {
    if (canMoveDown(index)) {
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
    canMoveUp,
    canMoveDown,
  };
};
