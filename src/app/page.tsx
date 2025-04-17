// import { allUserSelect } from "@prisma/client/sql";
// import { PrismaClient } from "@prisma/client";
// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import type { UserData } from "../lib/models/users/type";
import Link from "next/link";

export default async function Home() {
  // const prisma = new PrismaClient();
  // const users: UserData[] = await prisma.$queryRawTyped(allUserSelect());

  return (
    <div>
      <h1>投稿一覧</h1>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}:{user.createdAt.toISOString()}
          </li>
        ))}
      </ul> */}
      <Link href="create">
        <button className="h-10 w-20 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900 rounded">
          作成画面
        </button>
      </Link>
      {/* <Button href="/create" variant="contained">
        Hello world
      </Button> */}
      {/* <AddIcon color="info" fontSize="large" /> */}
    </div>
  );
}
