import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
import UserForm from "@/src/template/users/UserForm";
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
      <Content>
        <UserForm
          action={updateUser}
          btnText="更新"
          user={user}
          roomId={roomId}
        />
      </Content>
    </>
  );
};

export default RoomUserEditPage;
