"use client";

import Form from "next/form";
import InputField from "@/src/components/form/InputField";
import SelectField from "@/src/components/form/SelectField";
import DefaultRoomUsers from "@/src/components/form/rooms/DefaultRoomUsers";
import ToastButton from "@/src/components/nav/ToastButton";
import {
  INITIAL_POINT_OPTIONS,
  RETURN_POINT_OPTIONS,
  BONUS_POINT_OPTIONS,
  SCORE_RATE_OPTIONS,
  CHIP_RATE_OPTIONS,
  DEFAULT_GAME_RULES,
} from "@/src/constants/gameRules";
import { useState } from "react";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import type { ReadRoomDetail } from "@/src/lib/models/rooms/type";
import type { ReadUser } from "@/src/lib/models/users/type";
import type { ServerAction } from "@/src/hooks/ui/useServerActionToast";

interface RoomFormProps {
  action: ServerAction;
  btnText: string;
  room?: ReadRoomDetail;
  roomUsers?: ReadUser[];
}

const RoomForm = ({ action, btnText, room, roomUsers }: RoomFormProps) => {
  const today = new Date().toLocaleDateString("ja-JP");

  const [name, setName] = useState(room?.name ?? today);
  const initialPoint = room?.initialPoint ?? DEFAULT_GAME_RULES.initialPoint;
  const returnPoint = room?.returnPoint ?? DEFAULT_GAME_RULES.returnPoint;
  const bonusPoint = room?.bonusPoint ?? DEFAULT_GAME_RULES.bonusPoint;
  const scoreRate = room?.scoreRate ?? DEFAULT_GAME_RULES.scoreRate;
  const chipRate = room?.chipRate ?? DEFAULT_GAME_RULES.chipRate;
  const [amount, setAmount] = useState(room?.gameAmount ?? "");

  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(action);

  return (
    <Form action={handleSubmit} className="space-y-8">
      <input type="hidden" name="roomId" value={room?.id} />
      <InputField
        label="部屋名"
        name="name"
        type="text"
        maxLength={10}
        placeholder="部屋名を入力"
        value={name}
        onChange={(value) => setName(value)}
      />
      {roomUsers && <DefaultRoomUsers roomUsers={roomUsers} />}
      <SelectField
        label="持ち点"
        name="initialPoint"
        options={INITIAL_POINT_OPTIONS}
        defaultValue={initialPoint}
      />
      <SelectField
        label="返し点"
        name="returnPoint"
        options={RETURN_POINT_OPTIONS}
        defaultValue={returnPoint}
      />
      <SelectField
        label="ウマ"
        name="bonusPoint"
        options={BONUS_POINT_OPTIONS}
        defaultValue={bonusPoint}
      />
      <SelectField
        label="レート"
        name="scoreRate"
        options={SCORE_RATE_OPTIONS}
        defaultValue={scoreRate}
      />
      <SelectField
        label="チップ"
        name="chipRate"
        options={CHIP_RATE_OPTIONS}
        defaultValue={chipRate}
      />
      <InputField
        label="場代（後ほど更新できます）"
        name="gameAmount"
        type="number"
        maxLength={5}
        placeholder="金額を入力"
        value={amount}
        onChange={(value) => setAmount(value)}
      />
      <ToastButton
        toastMessage={toastMessage}
        toastColor={toastColor}
        redirect={redirect}
      >
        {isPending ? `${btnText}中...` : btnText}
      </ToastButton>
    </Form>
  );
};

export default RoomForm;
