"use client";

import Form from "next/form";
import SelectField from "@/src/components/form/SelectField";
import ToastButton from "@/src/components/nav/ToastButton";
import DefaultRoomUsers from "../rooms/utils/DefaultRoomUsers";
import {
  INITIAL_POINT_OPTIONS,
  RETURN_POINT_OPTIONS,
  BONUS_POINT_OPTIONS,
  SCORE_RATE_OPTIONS,
  CHIP_RATE_OPTIONS,
  DEFAULT_GAME_RULES,
} from "@/src/constants/gameRules";
import { useServerActionToast } from "@/src/hooks/ui/useServerActionToast";
import { upsertDefaultRoom } from "@/src/lib/models/setting";
import { ReadDefaultRoom } from "@/src/lib/models/setting/type";
import type { ReadUser } from "@/src/lib/models/users/type";
import { useShowPointsClient } from "@/src/hooks/auth/useShowPointsClient";

interface SettingFormProps {
  setting: ReadDefaultRoom;
  roomUsers: ReadUser[];
}

const SettingForm = ({ setting, roomUsers }: SettingFormProps) => {
  const showPoints = useShowPointsClient(setting?.isShowPoint ?? true);
  const { isPending, toastMessage, toastColor, redirect, handleSubmit } =
    useServerActionToast(upsertDefaultRoom);

  return (
    <Form action={handleSubmit} className="space-y-8">
      <DefaultRoomUsers
        roomUsers={roomUsers}
        href="/setting/room-setting/users"
      />
      <SelectField
        label="持ち点"
        name="initialPoint"
        options={INITIAL_POINT_OPTIONS}
        defaultValue={
          setting?.defaultInitialPoint ?? DEFAULT_GAME_RULES.initialPoint
        }
        isCustomBtn={true}
        href="/setting/room-setting/initialPoint"
        isInstantUpdate={true}
      />
      <SelectField
        label="返し点"
        name="returnPoint"
        options={RETURN_POINT_OPTIONS}
        defaultValue={
          setting?.defaultReturnPoint ?? DEFAULT_GAME_RULES.returnPoint
        }
        isCustomBtn={true}
        href="/setting/room-setting/returnPoint"
        isInstantUpdate={true}
      />
      <SelectField
        label="ウマ"
        name="bonusPoint"
        options={BONUS_POINT_OPTIONS}
        defaultValue={
          setting?.defaultBonusPoint ?? DEFAULT_GAME_RULES.bonusPoint
        }
        isCustomBtn={true}
        href="/setting/room-setting/bonusPoint"
        isInstantUpdate={true}
      />
      {showPoints && (
        <>
          <SelectField
            label="レート"
            name="scoreRate"
            options={SCORE_RATE_OPTIONS}
            defaultValue={
              setting?.defaultScoreRate ?? DEFAULT_GAME_RULES.scoreRate
            }
            isCustomBtn={true}
            href="/setting/room-setting/scoreRate"
            isInstantUpdate={true}
          />
          <SelectField
            label="チップ"
            name="chipRate"
            options={CHIP_RATE_OPTIONS}
            defaultValue={
              setting?.defaultChipRate ?? DEFAULT_GAME_RULES.chipRate
            }
            isCustomBtn={true}
            href="/setting/room-setting/chipRate"
            isInstantUpdate={true}
          />
        </>
      )}
      <ToastButton
        toastMessage={toastMessage}
        toastColor={toastColor}
        redirect={redirect}
        shouldReload={true} // 変更時はリロードする
        className="hidden"
      >
        {isPending ? "保存中..." : "保存"}
      </ToastButton>
    </Form>
  );
};

export default SettingForm;
