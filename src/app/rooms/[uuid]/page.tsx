import Header from "@/src/components/layout/Header";
import Main from "@/src/components/layout/Main";
import Form from "next/form";
// import InputField from "@/src/components/form/InputField";
// import IconSelect from "@/src/components/form/IconSelect";
// import ToastButton from "@/src/components/nav/ToastButton";
import AddScoreDialog from "@/src/components/nav/AddScoreDialog";
import DeleteDialog from "@/src/components/nav/DeleteDialog";
// import { readUser } from "@/src/lib/models/users/read";
// import { updateUser } from "@/src/lib/models/users/update";
// import { deleteUser } from "@/src/lib/models/users/delete";

const RoomPage = async ({ params }: { params: { uuid: string } }) => {
  const uuid = params.uuid;
  //   const user = await readUser(uuid);

  return (
    <>
      <Header title="2025/04/05" href="/rooms">
        {/* TODO: ルームの削除の実装 */}
        <Form action="deleteRooms">
          {/* <input type="hidden" name="id" value={room?.id} /> */}
          <DeleteDialog />
        </Form>
      </Header>
      <Main>
        <Form action="updateScore" className="center flex-col">
          {/* <input type="hidden" name="id" value={user?.id} /> */}
          ここに詳細
        </Form>
        <AddScoreDialog />
      </Main>
    </>
  );
};

export default RoomPage;
