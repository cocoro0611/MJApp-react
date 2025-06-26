import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Button from "@/src/components/ui/Button";
import { UserCard } from "@/src/template/Users";
import { readUsers } from "@/src/lib/models/users";

const UsersPage = async () => {
  const users = await readUsers();

  return (
    <>
      <Header title="ユーザー一覧" isBackIcon={false} />
      <Main isBlank={true}>
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
        <Button href="/users/new" color="fixed" />
      </Main>
    </>
  );
};

export default UsersPage;
