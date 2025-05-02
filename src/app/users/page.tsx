import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import UserCard from "@/src/template/Users/UserCard";
import ButtonFixed from "@/src/components/ui/ButtonFixed";
import { readUsers } from "@/src/lib/models/users/read";

const UsersPage = async () => {
  const users = await readUsers();

  return (
    <>
      <Header title="ユーザー一覧" isBackIcon={false} />
      <Main>
        <div className="grid-4">
          {users.map((user) => (
            <div key={user.id} className="center">
              <UserCard
                href={`/users/${user.id}/edit`}
                name={user.name}
                icon={user.icon}
              />
            </div>
          ))}
        </div>
        <ButtonFixed href="/users/new" />
      </Main>
    </>
  );
};

export default UsersPage;
