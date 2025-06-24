"use client";

import ScoreForm from "@/src/components/form/rooms/ScoreForm";
import ChipForm from "@/src/components/form/rooms/ChipForm";
import Keyboard from "@/src/components/form/rooms/Keyboard";
import Form from "next/form";
import type {
  ReadScore,
  ReadChip,
  ReadRoomDetail,
} from "@/src/lib/models/rooms/type";
import { useSelect } from "@/src/hooks/rooms/useSelection";
import { useScoreEditor } from "@/src/hooks/rooms/useScoreEditor";
import { useChipEditor } from "@/src/hooks/rooms/useChipEditor";
import { updateScore, updateChip } from "@/src/lib/models/rooms";
import { useEffect } from "react";

interface DataFormProps {
  scores: ReadScore[];
  chips: ReadChip[];
  roomDetail: ReadRoomDetail;
}

const DataForm = ({ scores, chips, roomDetail }: DataFormProps) => {
  const { selected, openSelect, closeSelect, moveLeft, moveRight } =
    useSelect();
  const {
    updateScore: editScore,
    getScore,
    getRemainingScore,
    isCompleteScore,
  } = useScoreEditor(scores, roomDetail.initialPoint);
  const {
    updateChip: editChip,
    getChip,
    getRemainingChip,
    isCompleteChip,
  } = useChipEditor(chips);

  const handleScoreChange = (newScore: number) => {
    if (!selected || selected.type !== "score") return;
    editScore(selected.gameCount, selected.index, newScore);
  };

  const handleChipChange = (newChip: number) => {
    if (!selected || selected.type !== "chip") return;
    editChip(selected.gameCount, selected.index, newChip);
  };

  // キーボード表示状態
  const isScoreSelected = selected !== null && selected.type === "score";
  const isChipSelected = selected !== null && selected.type === "chip";

  // 選択状態が変わった時のスクロール処理
  useEffect(() => {
    if (!selected) return;

    // スコアの最大ゲーム数を計算
    const maxScoGameCount =
      scores.length > 0
        ? Math.max(...scores.map((score) => score.gameCount))
        : 0;

    // スクロール条件
    const shouldScroll =
      (selected.type === "score" && selected.gameCount > 4) ||
      (selected.type === "chip" && maxScoGameCount + selected.gameCount > 4);

    if (shouldScroll) {
      // キーボードやh-47要素が描画されるのを待ってからスクロール
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 200);
    }
  }, [selected]); // selectedが変更された時に実行

  return (
    <>
      <ScoreForm
        scores={scores}
        roomId={roomDetail.id}
        selected={selected}
        onOpen={openSelect}
        getScore={getScore}
        getRemaining={getRemainingScore}
        isComplete={isCompleteScore}
      />
      <ChipForm
        chips={chips}
        chipRate={roomDetail.chipRate}
        roomId={roomDetail.id}
        selected={selected}
        onOpen={openSelect}
        getChip={getChip}
        getRemaining={getRemainingChip}
        isComplete={isCompleteChip}
      />
      {isScoreSelected && (
        <Form action={updateScore}>
          <input type="hidden" name="roomId" value={roomDetail.id} />
          <input
            type="hidden"
            name="gameCount"
            value={selected?.gameCount || ""}
          />
          {selected &&
            [0, 1, 2, 3].map((index) => (
              <input
                key={`player-${index}`}
                type="hidden"
                name={`score-${index}`}
                value={Math.round(getScore(selected.gameCount, index))}
              />
            ))}
          <div className="h-47" />
          <Keyboard
            selected={selected}
            onClose={closeSelect}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            value={getScore(selected.gameCount, selected.index)}
            onValueChange={handleScoreChange}
            isComplete={isCompleteScore(selected.gameCount)}
            maxLength={4}
          />
        </Form>
      )}
      {isChipSelected && (
        <Form action={updateChip}>
          <input type="hidden" name="roomId" value={roomDetail.id} />
          <input
            type="hidden"
            name="gameCount"
            value={selected?.gameCount || ""}
          />
          {selected &&
            [0, 1, 2, 3].map((index) => (
              <input
                key={`player-${index}`}
                type="hidden"
                name={`chip-${index}`}
                value={Math.round(getChip(selected.gameCount, index))}
              />
            ))}
          <div className="h-47" />
          <Keyboard
            selected={selected}
            onClose={closeSelect}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            value={getChip(selected.gameCount, selected.index)}
            onValueChange={handleChipChange}
            isComplete={isCompleteChip(selected.gameCount)}
            maxLength={2}
          />
        </Form>
      )}
    </>
  );
};

export default DataForm;
