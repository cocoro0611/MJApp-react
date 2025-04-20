import Link from "next/link";
import { readUsers } from "../lib/models/users/read";

export default async function Home() {
  const users = await readUsers();

  return (
    <div>
      <h1>テスト投稿一覧</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Link href="/create">
        <button className="h-10 w-20 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900 rounded">
          作成画面
        </button>
      </Link>
    </div>
  );
}
