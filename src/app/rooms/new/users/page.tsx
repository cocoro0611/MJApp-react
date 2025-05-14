import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Form from "next/form";
import SelectRoomUsers from "@/src/components/form/rooms/SelectRoomUsers";
import { readUsers } from "@/src/lib/models/users/read/read-users";
import { updateDefaultUser } from "@/src/lib/models/users/update";

const SelectUsersPage = async () => {
  const users = await readUsers();

  return (
    <>
      <Header title="ルームの作成" href="/rooms/new" />
      <Main>
        <Form action={updateDefaultUser} className="center flex-col space-y-8">
          <SelectRoomUsers users={users} />
        </Form>
      </Main>
    </>
  );
};

export default SelectUsersPage;
