"use client";

import Button from "@/src/components/ui/Button";
import Card from "@/src/components/ui/Card";
import Image from "next/image";
import Form from "next/form";
import { updateScoreOrder } from "@/src/lib/models/rooms";
import type { TiedScore } from "@/src/lib/models/rooms/actions/read/read-tied-scores";
import { useState } from "react";

interface OrderEditFormProps {
  roomId: string;
  gameCount: number;
  tiedScores: TiedScore[];
}

const OrderEditForm = ({
  roomId,
  gameCount,
  tiedScores,
}: OrderEditFormProps) => {
  const [orderedScores, setOrderedScores] = useState(tiedScores);

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

  return (
    <Form action={updateScoreOrder}>
      <input type="hidden" name="roomId" value={roomId} />
      <input type="hidden" name="gameCount" value={gameCount} />

      <div className="text-xl font-bold mb-2">
        {`${gameCount} 回戦 順位調整`}
      </div>
      <div className="text-gray-600 text-sm mb-8 font-semibold">
        <p>同じ点数のプレイヤーがいます。</p>
        <p>順位を調整してください。</p>
      </div>

      <div className="center flex-col space-y-4 mb-8">
        {orderedScores.map((scoreData, index) => (
          <Card key={scoreData.userId} className="p-2">
            <input
              type="hidden"
              name={`order-${scoreData.userId}`}
              value={index + 1}
            />
            <div className="grid grid-cols-10">
              <div className="col-span-1 center">
                <div className="center w-8 h-8 toggle-active rounded-lg">
                  {index + 1}
                </div>
              </div>
              <div className="col-span-2 center h-14 w-14 ml-2">
                <Image
                  src={scoreData.userIcon}
                  alt="user-icon"
                  width={50}
                  height={50}
                />
              </div>
              <div className="col-span-3 center flex-col gap-2 text-sm">
                <div>{scoreData.userName}</div>
                <div>{scoreData.score / 100}00点</div>
              </div>
              <div className="col-span-4 center gap-2">
                <Button
                  color="white"
                  disabled={index === 0}
                  className="w-12 h-12 rounded"
                  onClick={() => moveUp(index)}
                >
                  ↑
                </Button>
                <Button
                  color="white"
                  disabled={index === orderedScores.length - 1}
                  className="w-12 h-12 rounded"
                  onClick={() => moveDown(index)}
                >
                  ↓
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button color="cancel" onClick={() => window.history.back()}>
          キャンセル
        </Button>
        <Button type="submit">順位を確定</Button>
      </div>
    </Form>
  );
};

export default OrderEditForm;
