import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import SelectRoomUsersForm from "@/src/template/rooms/SelectRoomUsersForm";
import { readUsers } from "@/src/lib/models/users";
import { upsertDefaultUsers } from "@/src/lib/models/setting";

const SelectUsersPage = async () => {
  const users = await readUsers();

  return (
    <>
      <Header title="ユーザー設定" href="/setting/room-setting" />
      <Content>
        <SelectRoomUsersForm action={upsertDefaultUsers} users={users} />
      </Content>
    </>
  );
};

export default SelectUsersPage;
