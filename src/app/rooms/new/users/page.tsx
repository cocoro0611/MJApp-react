import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import SelectRoomUsersForm from "@/src/template/rooms/SelectRoomUsersForm";
import { readUsers } from "@/src/lib/models/users";
import { updateDefaultUser } from "@/src/lib/models/rooms";

const SelectUsersPage = async () => {
  const users = await readUsers();

  return (
    <>
      <Header title="ルームの作成" href="/rooms/new" />
      <Content>
        <SelectRoomUsersForm action={updateDefaultUser} users={users} />
      </Content>
    </>
  );
};

export default SelectUsersPage;
