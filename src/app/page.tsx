import Link from "next/link";
import { readUsers } from "../lib/models/users/read";
import { deleteUser } from "../lib/models/users/delete";

export default async function Home() {
  const users = await readUsers();

  return (
    <div>
      <h1>投稿一覧</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <Link href={`/edit/${user.id}`}>
              <button className="h-8 w-16 text-white bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 rounded">
                編集
              </button>
            </Link>
            <form action={deleteUser}>
              <input type="hidden" name="id" value={user.id} />
              <button
                type="submit"
                className="h-8 w-16 text-white bg-red-500 hover:bg-red-700 active:bg-red-900 rounded"
              >
                削除
              </button>
            </form>
          </li>
        ))}
      </ul>
      <Link href="/crad">
        <button className="h-10 w-20 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900 rounded">
          作成画面
        </button>
      </Link>
    </div>
  );
}
