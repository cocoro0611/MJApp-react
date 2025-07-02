import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import RoomForm from "@/src/template/rooms/RoomForm";
import { createRoom } from "@/src/lib/models/rooms";
import { readSetting } from "@/src/lib/models/setting";
import { readDefaultUsers } from "@/src/lib/models/users";

const RoomNewPage = async () => {
  const roomUsers = await readDefaultUsers();
  const setting = await readSetting();

  return (
    <>
      <Header title="ルームの作成" href="/rooms" />
      <Main>
        <RoomForm
          action={createRoom}
          btnText="作成"
          roomUsers={roomUsers}
          setting={setting}
        />
      </Main>
    </>
  );
};

export default RoomNewPage;
