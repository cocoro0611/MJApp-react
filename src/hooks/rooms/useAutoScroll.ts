import { useEffect } from "react";
import type { SelectState } from "@/src/hooks/rooms/useSelection";
import type { ReadScore, ReadChip } from "@/src/lib/models/rooms/type";

interface UseAutoScrollProps {
  selected: SelectState | null;
  scores: ReadScore[];
  chips: ReadChip[];
}

export const useAutoScroll = ({
  selected,
  scores,
  chips,
}: UseAutoScrollProps) => {
  useEffect(() => {
    if (!selected) return;

    // スコアの最大ゲーム数を計算
    const maxScoreGameCount =
      scores.length > 0
        ? Math.max(...scores.map((score) => score.gameCount))
        : 0;

    // チップの最大ゲーム数を計算
    const maxChipGameCount =
      chips.length > 0 ? Math.max(...chips.map((chip) => chip.gameCount)) : 0;

    // スクロール条件（一番下を選択した時だけスクロール）
    const shouldScroll =
      (selected.type === "score" &&
        maxChipGameCount === 0 &&
        selected.gameCount > maxScoreGameCount - 1) ||
      (selected.type === "chip" && selected.gameCount > maxChipGameCount - 1);

    if (shouldScroll) {
      // キーボードやh-47要素が描画されるのを待ってからスクロール
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    }
  }, [selected, scores, chips]);
};
