import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import DeleteForm from "@/src/components/form/DeleteForm";
import UserForm from "@/src/template/Users/UserForm";
import { readUser } from "@/src/lib/models/users/read/read-user";
import { deleteUser } from "@/src/lib/models/users/delete";
import { updateUser } from "@/src/lib/models/users/update";

interface UserEditPageProps {
  params: Promise<{ uuid: string }>;
}

const UserEditPage = async ({ params }: UserEditPageProps) => {
  const { uuid } = await params;
  const user = await readUser(uuid);

  if (!user) {
    throw new Error("ユーザーが見つかりません");
  }

  return (
    <>
      <Header title="ユーザー編集" href="/users">
        <DeleteForm action={deleteUser} name="id" value={user?.id} />
      </Header>
      <Main>
        <UserForm action={updateUser} btnText="更新" user={user} />
      </Main>
    </>
  );
};

export default UserEditPage;
