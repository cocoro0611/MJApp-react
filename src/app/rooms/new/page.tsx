import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import RoomForm from "@/src/template/Rooms/RoomForm";
import { createRoom } from "@/src/lib/models/rooms/create";
import { readDefaultUsers } from "@/src/lib/models/users/read/read-default-users";

const RoomNewPage = async () => {
  const roomUsers = await readDefaultUsers();

  return (
    <>
      <Header title="ルームの作成" href="/rooms" />
      <Main>
        <RoomForm action={createRoom} btnText="作成" roomUsers={roomUsers} />
      </Main>
    </>
  );
};

export default RoomNewPage;
