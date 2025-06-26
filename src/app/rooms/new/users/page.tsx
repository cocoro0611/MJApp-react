import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import SelectRoomUsersForm from "@/src/template/Rooms/SelectRoomUsersForm";
import { readUsers, updateDefaultUser } from "@/src/lib/models/users";

const SelectUsersPage = async () => {
  const users = await readUsers();

  return (
    <>
      <Header title="ルームの作成" href="/rooms/new" />
      <Main>
        <SelectRoomUsersForm action={updateDefaultUser} users={users} />
      </Main>
    </>
  );
};

export default SelectUsersPage;
