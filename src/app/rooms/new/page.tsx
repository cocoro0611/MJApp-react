import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Form from "next/form";
import InputField from "@/src/components/form/InputField";
import SelectField from "@/src/components/form/SelectField";
import DefaultRoomUsers from "@/src/template/Rooms/DefaultRoomUsers";
import ToastButton from "@/src/components/nav/ToastButton";
import {
  INITIAL_POINT_OPTIONS,
  RETURN_POINT_OPTIONS,
  BONUS_POINT_OPTIONS,
  SCORE_RATE_OPTIONS,
  CHIP_RATE_OPTIONS,
  DEFAULT_GAME_RULES,
} from "@/src/constants/gameRules";
import { createRoom } from "@/src/lib/models/rooms/create";

const RoomNewPage = async () => {
  return (
    <>
      <Header title="ルームの作成" href="/rooms" />
      <Main>
        <Form action={createRoom} className="center flex-col space-y-8">
          <InputField
            label="部屋名"
            name="name"
            type="text"
            maxLength={10}
            placeholder="部屋名を入力"
            defaultValue={new Date().toLocaleDateString("ja-JP")}
          />
          <DefaultRoomUsers />
          <SelectField
            label="持ち点"
            name="initialPoint"
            options={INITIAL_POINT_OPTIONS}
            defaultValue={DEFAULT_GAME_RULES.initialPoint}
          />
          <SelectField
            label="返し点"
            name="returnPoint"
            options={RETURN_POINT_OPTIONS}
            defaultValue={DEFAULT_GAME_RULES.returnPoint}
          />
          <SelectField
            label="ウマ"
            name="bonusPoint"
            options={BONUS_POINT_OPTIONS}
            defaultValue={DEFAULT_GAME_RULES.bonusPoint}
          />
          <SelectField
            label="レート"
            name="scoreRate"
            options={SCORE_RATE_OPTIONS}
            defaultValue={DEFAULT_GAME_RULES.scoreRate}
          />
          <SelectField
            label="チップ"
            name="chipRate"
            options={CHIP_RATE_OPTIONS}
            defaultValue={DEFAULT_GAME_RULES.chipRate}
          />
          <ToastButton alertMessage="作成しました" alertColor="success">
            作成
          </ToastButton>
        </Form>
      </Main>
    </>
  );
};

export default RoomNewPage;
