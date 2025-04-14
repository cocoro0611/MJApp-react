import { allUserSelect } from "@prisma/client/sql";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();
  const users = await prisma.$queryRawTyped(allUserSelect());

  return (
    <div>
      <h1>投稿一覧</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
