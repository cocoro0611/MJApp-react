import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import UserForm from "@/src/template/users/UserForm";
import { createUser } from "@/src/lib/models/users";

const UserNewPage = () => {
  return (
    <>
      <Header title="ユーザー作成" href="/users" />
      <Main>
        <UserForm action={createUser} btnText="作成" />
      </Main>
    </>
  );
};

export default UserNewPage;
