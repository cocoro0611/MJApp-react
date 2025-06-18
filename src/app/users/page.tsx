import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import { UserCard } from "@/src/template/Users";
import ButtonFixed from "@/src/components/ui/ButtonFixed";
import { readUsers } from "@/src/lib/models/users";

const UsersPage = async () => {
  const users = await readUsers();

  return (
    <>
      <Header title="ユーザー一覧" isBackIcon={false} />
      <Main>
        <div className="grid-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              href={`/users/${user.id}/edit`}
              name={user.name}
              icon={user.icon}
            />
          ))}
        </div>
        <ButtonFixed href="/users/new" />
      </Main>
    </>
  );
};

export default UsersPage;
