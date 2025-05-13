import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import UserForm from "@/src/template/Users/UserForm";
import Form from "next/form";
import DeleteDialog from "@/src/components/nav/DeleteDialog";
import { readUser } from "@/src/lib/models/users/read";
import { updateUser } from "@/src/lib/models/users/update";
import { deleteUser } from "@/src/lib/models/users/delete";

const UserEditPage = async ({ params }: { params: { uuid: string } }) => {
  const uuid = params.uuid;
  const user = await readUser(uuid);

  if (!user) {
    throw new Error("ユーザーが見つかりません");
  }

  return (
    <>
      <Header title="ユーザー編集" href="/users">
        <Form action={deleteUser}>
          <input type="hidden" name="id" value={user?.id} />
          <DeleteDialog />
        </Form>
      </Header>
      <Main>
        <UserForm action={updateUser} btnText="更新" user={user} />
      </Main>
    </>
  );
};

export default UserEditPage;
