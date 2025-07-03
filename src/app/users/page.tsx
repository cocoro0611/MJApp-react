import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import UserCard from "@/src/template/users/UserCard";
import ButtonFixed from "@/src/components/ui/ButtonFixed";
import MessageHandler from "@/src/components/nav/MessageHandler";
import { readUsers } from "@/src/lib/models/users";

const UsersPage = async () => {
  const users = await readUsers();

  return (
    <>
      <Header title="ユーザー一覧" showBackButton={false} />
      <Content isBlank={true}>
        <div className="grid-4 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              border="sm"
              href={`/users/${user.id}/edit`}
              name={user.name}
              icon={user.icon}
            />
          ))}
        </div>
        <ButtonFixed href="/users/new" />
      </Content>
      <MessageHandler type="user" />
    </>
  );
};

export default UsersPage;
