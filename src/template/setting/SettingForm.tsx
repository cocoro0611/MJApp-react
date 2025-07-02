"use client";

import Form from "next/form";
import SelectField from "@/src/components/form/SelectField";
import ToastButton from "@/src/components/nav/ToastButton";
import {
  INITIAL_POINT_OPTIONS,
  RETURN_POINT_OPTIONS,
  BONUS_POINT_OPTIONS,
  SCORE_RATE_OPTIONS,
  CHIP_RATE_OPTIONS,
  DEFAULT_GAME_RULES,
} from "@/src/constants/gameRules";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import type { ReadDefaultRoom } from "@/src/lib/models/rooms/type";
import type { ServerAction } from "@/src/hooks/ui/useServerActionToast";

interface SettingFormProps {
  action: ServerAction;
  btnText: string;
  setting?: ReadDefaultRoom;
}

const SettingForm = ({ action, btnText, setting }: SettingFormProps) => {
  // デフォルト値の設定
  const getDefaultValue = (
    settingValue: number | undefined,
    fallbackValue: number
  ): number => {
    return settingValue ?? fallbackValue;
  };

  const initialPoint = getDefaultValue(
    setting?.defaultInitialPoint,
    DEFAULT_GAME_RULES.initialPoint
  );

  const returnPoint = getDefaultValue(
    setting?.defaultReturnPoint,
    DEFAULT_GAME_RULES.returnPoint
  );

  const bonusPoint =
    setting?.defaultBonusPoint ?? DEFAULT_GAME_RULES.bonusPoint;

  const scoreRate = getDefaultValue(
    setting?.defaultScoreRate,
    DEFAULT_GAME_RULES.scoreRate
  );

  const chipRate = getDefaultValue(
    setting?.defaultChipRate,
    DEFAULT_GAME_RULES.chipRate
  );

  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(action);

  return (
    <Form action={handleSubmit} className="space-y-8">
      <SelectField
        label="持ち点"
        name="initialPoint"
        options={INITIAL_POINT_OPTIONS}
        defaultValue={initialPoint}
        isCustomBtn={true}
        href="/setting/room-setting/initialPoint"
      />
      <SelectField
        label="返し点"
        name="returnPoint"
        options={RETURN_POINT_OPTIONS}
        defaultValue={returnPoint}
        isCustomBtn={true}
        href="/setting/room-setting/returnPoint"
      />
      <SelectField
        label="ウマ"
        name="bonusPoint"
        options={BONUS_POINT_OPTIONS}
        defaultValue={bonusPoint}
        isCustomBtn={true}
        href="/setting/room-setting/bonusPoint"
      />
      <SelectField
        label="レート"
        name="scoreRate"
        options={SCORE_RATE_OPTIONS}
        defaultValue={scoreRate}
        isCustomBtn={true}
        href="/setting/room-setting/scoreRate"
      />
      <SelectField
        label="チップ"
        name="chipRate"
        options={CHIP_RATE_OPTIONS}
        defaultValue={chipRate}
        isCustomBtn={true}
        href="/setting/room-setting/chipRate"
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

export default SettingForm;
