import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import { UserForm } from "@/src/template/Users";
import { readUser, updateUser } from "@/src/lib/models/users";

interface RoomUserEditPageProps {
  params: Promise<{ roomId: string; userId: string }>;
}

const RoomUserEditPage = async ({ params }: RoomUserEditPageProps) => {
  const { roomId, userId } = await params;
  const user = await readUser(userId);

  return (
    <>
      <Header title="ユーザー編集" href={`/rooms/${roomId}`} />
      <Main>
        <UserForm
          action={updateUser}
          btnText="更新"
          user={user}
          roomId={roomId}
        />
      </Main>
    </>
  );
};

export default RoomUserEditPage;
