import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import SelectRoomUsersForm from "@/src/template/rooms/SelectRoomUsersForm";
import { readUsers } from "@/src/lib/models/users";
import { updateDefaultUser } from "@/src/lib/models/rooms";

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
