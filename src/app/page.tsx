import { allUserSelect } from "@prisma/client/sql";
import { PrismaClient } from "@prisma/client";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default async function Home() {
  const prisma = new PrismaClient();
  const users = await prisma.$queryRawTyped(allUserSelect());

  return (
    <div>
      <h1>投稿一覧</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}:{user.createdAt.toISOString()}
          </li>
        ))}
      </ul>
      <Button variant="contained">Hello world</Button>
      <AddIcon color="info" fontSize="large" />
    </div>
  );
}
