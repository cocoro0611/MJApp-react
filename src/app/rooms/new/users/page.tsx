import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import SelectRoomUsersForm from "@/src/template/rooms/SelectRoomUsersForm";
import { readUsers } from "@/src/lib/models/users";
import { upsertDefaultUsers } from "@/src/lib/models/setting";

const SelectRoomUsersPage = async () => {
  const users = await readUsers();

  return (
    <>
      <Header title="ルームの作成" href="/rooms/new" />
      <Content>
        <SelectRoomUsersForm
          action={upsertDefaultUsers}
          users={users}
          isNewRoom={true}
        />
      </Content>
    </>
  );
};

export default SelectRoomUsersPage;
