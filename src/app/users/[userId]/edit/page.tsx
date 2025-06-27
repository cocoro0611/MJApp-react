import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import DeleteForm from "@/src/components/form/DeleteForm";
import UserForm from "@/src/template/Users/UserForm";
import { readUser, updateUser, deleteUser } from "@/src/lib/models/users";

interface UserEditPageProps {
  params: Promise<{ userId: string }>;
}

const UserEditPage = async ({ params }: UserEditPageProps) => {
  const { userId } = await params;
  const user = await readUser(userId);

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
