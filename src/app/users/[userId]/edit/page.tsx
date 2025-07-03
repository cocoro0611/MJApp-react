import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import DeleteForm from "@/src/components/form/DeleteForm";
import UserForm from "@/src/template/users/UserForm";
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
      <Content>
        <UserForm action={updateUser} btnText="更新" user={user} />
      </Content>
    </>
  );
};

export default UserEditPage;
