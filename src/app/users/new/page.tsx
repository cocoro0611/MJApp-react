import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import UserForm from "@/src/template/users/UserForm";
import { createUser } from "@/src/lib/models/users";

const UserNewPage = () => {
  return (
    <>
      <Header title="ユーザー作成" href="/users" />
      <Content>
        <UserForm action={createUser} btnText="作成" />
      </Content>
    </>
  );
};

export default UserNewPage;
