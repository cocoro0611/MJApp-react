import { useEffect } from "react";
import type { SelectState } from "@/src/hooks/rooms/useSelection";
import type { ReadScore } from "@/src/lib/models/rooms/type";

interface UseAutoScrollProps {
  selected: SelectState | null;
  scores: ReadScore[];
}

export const useAutoScroll = ({ selected, scores }: UseAutoScrollProps) => {
  useEffect(() => {
    if (!selected) return;

    // スコアの最大ゲーム数を計算
    const maxScoreGameCount =
      scores.length > 0
        ? Math.max(...scores.map((score) => score.gameCount))
        : 0;

    // スクロール条件
    const shouldScroll =
      (selected.type === "score" && selected.gameCount > 4) ||
      (selected.type === "chip" && maxScoreGameCount + selected.gameCount > 4);

    if (shouldScroll) {
      // キーボードやh-47要素が描画されるのを待ってからスクロール
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    }
  }, [selected, scores]);
};
