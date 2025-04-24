import { readUsers } from "@/src/lib/models/users/read";
import UserCard from "@/src/template/Users/UserCard";
import ButtonFixed from "@/src/components/ui/ButtonFixed";

const UsersPage = async () => {
  const users = await readUsers();

  return (
    <div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
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
      <div className="py-20"></div>
      <ButtonFixed href="/users/new" />
    </div>
  );
};

export default UsersPage;
