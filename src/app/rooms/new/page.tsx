import Header from "@/src/components/layout/Header";
import Content from "@/src/components/layout/Content";
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
      <Content>
        <RoomForm
          action={createRoom}
          btnText="作成"
          roomUsers={roomUsers}
          setting={setting}
        />
      </Content>
    </>
  );
};

export default RoomNewPage;
