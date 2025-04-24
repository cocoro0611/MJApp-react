import { readUsers } from "@/src/lib/models/users/read";
import Link from "next/link";

const UsersPage = async () => {
  const users = await readUsers();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.name}</div>
          <div>{user.icon}</div>
          <Link href={`/users/${user.id}`} className="bg-blue-200">
            編集ボタン
          </Link>
        </div>
      ))}
      <div className="py-20"></div>
      <Link href="/users/new" className="test-btn">
        ユーザ作成ページへ
      </Link>
    </div>
  );
};

export default UsersPage;
