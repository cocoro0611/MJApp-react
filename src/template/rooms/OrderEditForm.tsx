"use client";

import Form from "next/form";
import Image from "next/image";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import ToastButton from "@/src/components/nav/ToastButton";
import { useOrderEdit } from "@/src/hooks/rooms/useOrderEdit";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { updateScoreOrder } from "@/src/lib/models/rooms";
import type { TiedScore } from "@/src/lib/models/rooms/actions/read/read-tied-scores";

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
  const { orderedScores, moveUp, moveDown, canMoveUp, canMoveDown } =
    useOrderEdit(tiedScores);
  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(updateScoreOrder);

  return (
    <Form action={handleSubmit} className="space-y-8">
      <input type="hidden" name="roomId" value={roomId} />
      <input type="hidden" name="gameCount" value={gameCount} />

      <div className="info-box-secondary">
        <p>同じ点数のプレイヤーがいます。</p>
        <p>順位を調整してください。</p>
      </div>

      <div className="center flex-col space-y-4">
        {orderedScores.map((scoreData, index) => (
          <Card key={scoreData.userId} isEffect={false} className="p-2">
            <input
              type="hidden"
              name={`order-${scoreData.userId}`}
              value={index + 1}
            />
            <div className="grid grid-cols-10">
              <div className="col-span-1 center">
                <div className="center w-8 h-8 toggle-on rounded-lg">
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
                  disabled={!canMoveUp(index)}
                  className="w-12 h-12 rounded border border-gray-300 shadow-lg"
                  onClick={() => moveUp(index)}
                >
                  ↑
                </Button>
                <Button
                  color="white"
                  disabled={!canMoveDown(index)}
                  className="w-12 h-12 rounded border-gray-300 shadow-lg"
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
        <ToastButton
          toastMessage={toastMessage}
          toastColor={toastColor}
          redirect={redirect}
        >
          {isPending ? "処理中..." : "順位を確定"}
        </ToastButton>
      </div>
    </Form>
  );
};

export default OrderEditForm;
