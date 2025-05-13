import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Form from "next/form";
import InputField from "@/src/components/form/InputField";
import SelectField from "@/src/components/form/SelectField";
import UserSelectField from "@/src/components/form/UserSelectField";
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
import { readUsers } from "@/src/lib/models/users/read";

const RoomNewPage = async () => {
  const users = await readUsers();

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
            className="w-[19.4rem] md:w-[39.2rem]"
          />
          <UserSelectField
            users={users}
            className="w-[19.4rem] md:w-[39.2rem]"
          />
          <SelectField
            label="持ち点"
            name="initialPoint"
            options={INITIAL_POINT_OPTIONS}
            defaultValue={DEFAULT_GAME_RULES.initialPoint}
            className="w-[19.4rem] md:w-[39.2rem]"
          />
          <SelectField
            label="返し点"
            name="returnPoint"
            options={RETURN_POINT_OPTIONS}
            defaultValue={DEFAULT_GAME_RULES.returnPoint}
            className="w-[19.4rem] md:w-[39.2rem]"
          />
          <SelectField
            label="ウマ"
            name="bonusPoint"
            options={BONUS_POINT_OPTIONS}
            defaultValue={DEFAULT_GAME_RULES.bonusPoint}
            className="w-[19.4rem] md:w-[39.2rem]"
          />
          <SelectField
            label="レート"
            name="scoreRate"
            options={SCORE_RATE_OPTIONS}
            defaultValue={DEFAULT_GAME_RULES.scoreRate}
            className="w-[19.4rem] md:w-[39.2rem]"
          />
          <SelectField
            label="チップ"
            name="chipRate"
            options={CHIP_RATE_OPTIONS}
            defaultValue={DEFAULT_GAME_RULES.chipRate}
            className="w-[19.4rem] md:w-[39.2rem]"
          />
          <ToastButton
            alertMessage="作成しました"
            alertColor="success"
            className="w-[19.4rem] md:w-[39.2rem]"
          >
            作成
          </ToastButton>
        </Form>
      </Main>
    </>
  );
};

export default RoomNewPage;
